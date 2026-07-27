import { extension, isUnpackable, toString } from "@weborigami/async-tree";
import highlight from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId as markedGfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";
import markedAlert from "marked-alert";
import markedFootnote from "marked-footnote";
import { baseUrl as markedBaseUrl } from "marked-base-url";
import mathMarkedOriginal from "@webc.site/math-marked";
import { documentObject, origamiHighlightDefinition } from "@weborigami/origami";

highlight.registerLanguage("ori", origamiHighlightDefinition);

/**
 * Escape & " < > for safe interpolation in HTML attributes.
 * @param {string} str
 * @returns {string}
 */
function escapeAttr(str) {
	return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Wraps the @webc.site/math-marked extension so that each rendered math element also carries a `data-tex` attribute containing the original LaTeX source.
 * This lets client-side scripts reconstruct the raw formula text (eg for clipboard copying).
 *
 * @returns {import("marked").MarkedExtension}
 */
function mathMarked() {
	const ext = mathMarkedOriginal();
	for (const item of ext.extensions) {
		const origRender = item.renderer;
		item.renderer = (token) => {
			const html = origRender(token);
			const escaped = escapeAttr(token.text);
			return html.replace("<math", `<math data-tex="${escaped}"`);
		};
	}
	return ext;
}

/**
 * Escape & < > for safe interpolation in HTML element content.
 * @param {string} str
 * @returns {string}
 */
function escapeHtml(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const ORDINAL_RX = /^\b(\d+)(st|nd|rd|th)\b/i;
const ORDINAL_SEARCH_RX = /\b(\d+)(st|nd|rd|th)\b/i;

/**
 * Custom marked inline extension providing three syntax additions:
 * 1. Auto-superscript ordinals.
 * 2. Subscript (wrap in tildes).
 * 3. Superscript (wrap in up carets).
 *
 * @type {import("marked").MarkedExtension}
 */
const subSup = {
	extensions: [
		{
			name: "subSup",
			level: "inline",
			start(src) {
				const tilt = src.search(/[~^]/);
				const ord = src.search(ORDINAL_SEARCH_RX);
				if (tilt === -1) return ord;
				if (ord === -1) return tilt;
				return Math.min(tilt, ord);
			},
			tokenizer(src) {
				const ord = ORDINAL_RX.exec(src);
				if (ord) {
					return {
						type: "subSup",
						raw: ord[0],
						number: ord[1],
						text: ord[2],
						sub: false,
						ordinal: true,
					};
				}
				const sub = /^~([^\s~](?:[^~\n]*[^\s~])?)~/.exec(src);
				if (sub) {
					return {
						type: "subSup",
						raw: sub[0],
						text: sub[1],
						sub: true,
					};
				}
				const sup = /^\^([^\s^](?:[^\^\n]*[^\s^])?)\^/.exec(src);
				if (sup) {
					return {
						type: "subSup",
						raw: sup[0],
						text: sup[1],
						sub: false,
					};
				}
			},
			renderer(token) {
				if (token.ordinal) {
					return `${token.number}<sup>${escapeHtml(token.text)}</sup>`;
				}
				const tag = token.sub ? "sub" : "sup";
				return `<${tag}>${escapeHtml(token.text)}</${tag}>`;
			},
		},
	],
};

const processor = new Marked(
	markedGfmHeadingId(),
	markedHighlight({
		highlight(code, lang) {
			const name = lang ? lang.toLowerCase() : "";
			let language = langCache.get(name);
			if (language === undefined) {
				language = highlight.getLanguage(name) ? name : "plaintext";
				langCache.set(name, language);
			}
			return highlight.highlight(code, { language }).value;
		},
		langPrefix: "language-",
	}),
	markedSmartypants(),
	{
		gfm: true,
	},
	markedAlert(),
	markedFootnote(),
	markedBaseUrl("https://vale.rocks"),
	mathMarked(),
	subSup,
);

const langCache = new Map();
const QUICK_CHECK_RX = /[A-Z]{3}/;
const TAG_SPLIT_RX = /(<[^>]+>)/;
const EXCLUDED_OPEN_RX = /^<(code|script|style)[^>]*>/i;
const EXCLUDED_CLOSE_RX = /^<\/(code|script|style)>/i;
const ABBR_OPEN_RX = /^<abbr[^>]*>/i;
const ABBR_CLOSE_RX = /^<\/abbr>/i;
const ABBREV_RX = /\b(?:\d+[A-Z]+[a-z]*|[A-Z]{3,}[a-z]*)\b/g;
const ROMAN_NUMERAL_RX = /^(?=[MDCLXVI])M{0,4}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;
const CAPS_RX = /[A-Z]+/;
const STARTS_DIGIT_RX = /^\d/;
const DIGIT_UPPER_RX = /\d+[A-Z]+/;
const LOWERCASE_END_RX = /[a-z]*$/;

/**
 * Wraps strings of three or more capital letters in <abbr>
 * Excludes Roman numerals, <code>, element attributes, and content already in <abbr>
 *
 * @param {string} html - The HTML to process
 * @returns {string} - HTML with abbreviations wrapped in <abbr>
 */
function wrapAbbreviations(html) {
	if (!QUICK_CHECK_RX.test(html)) return html;

	const segments = html.split(TAG_SPLIT_RX);
	const result = [];

	let excludedWrapper = 0;
	let insideAbbr = false;

	for (const segment of segments) {
		if (segment[0] === "<" && segment[segment.length - 1] === ">") {
			result.push(segment);

			if (EXCLUDED_OPEN_RX.test(segment)) {
				excludedWrapper++;
			} else if (EXCLUDED_CLOSE_RX.test(segment)) {
				excludedWrapper--;
			} else if (ABBR_OPEN_RX.test(segment)) {
				insideAbbr = true;
			} else if (ABBR_CLOSE_RX.test(segment)) {
				insideAbbr = false;
			}
			continue;
		}

		if (excludedWrapper > 0 || insideAbbr || !segment) {
			result.push(segment);
			continue;
		}

		const processedSegment = segment.replace(ABBREV_RX, (match) => {
			if (STARTS_DIGIT_RX.test(match)) {
				const capitalPart = match.match(DIGIT_UPPER_RX)[0];
				const lowercasePart = match.substring(capitalPart.length);
				return `<abbr>${capitalPart}</abbr>${lowercasePart}`;
			}

			const capitalPortion = match.match(CAPS_RX)[0];
			if (ROMAN_NUMERAL_RX.test(capitalPortion)) return match;

			const lowercasePart = match.match(LOWERCASE_END_RX)[0];
			const capitalPart = match.substring(0, match.length - lowercasePart.length);
			return `<abbr>${capitalPart}</abbr>${lowercasePart}`;
		});

		result.push(processedSegment);
	}

	return result.join("");
}

/**
 * Transform markdown to HTML.
 *
 * @typedef {import("@weborigami/async-tree").StringLike} StringLike
 * @typedef {import("@weborigami/async-tree").Unpackable<StringLike>} UnpackableStringlike
 *
 * @this {import("@weborigami/types").AsyncTree|null|void}
 * @param {StringLike|UnpackableStringlike} input
 */
export default async function mdHtml(input) {
	if (input == null) {
		const error = new TypeError("mdHtml: The input is not defined.");
		/** @type {any} */ (error).position = 0;
		throw error;
	}
	if (isUnpackable(input)) {
		input = await input.unpack();
	}
	const inputIsDocument = input["_body"] !== undefined;
	const markdown = inputIsDocument ? input._body : toString(input);
	if (markdown === null) {
		throw new Error("mdHtml: The provided input couldn't be treated as text.");
	}

	let html = processor.parse(markdown);
	html = wrapAbbreviations(html);

	return inputIsDocument ? documentObject(html, input) : html;
}

mdHtml.key = (sourceKey) => extension.replace(sourceKey, ".md", ".html");
mdHtml.inverseKey = (resultKey) => extension.replace(resultKey, ".html", ".md");
