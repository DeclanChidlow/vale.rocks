import { extension, isUnpackable, toString } from "@weborigami/async-tree";
import highlight from "highlight.js";
import { Marked } from "marked";
import { gfmHeadingId as markedGfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";
import markedAlert from "marked-alert";
import markedFootnote from "marked-footnote";
import { baseUrl as markedBaseUrl } from "marked-base-url";
import { documentObject, origamiHighlightDefinition } from "@weborigami/origami";

highlight.registerLanguage("ori", origamiHighlightDefinition);

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
