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
			const language = highlight.getLanguage(lang) ? lang : "plaintext";
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

/**
 * Wraps strings of three or more capital letters in <abbr>
 * Excludes Roman numerals, <code>, element attributes, and content already in <abbr>
 *
 * @param {string} html - The HTML to process
 * @returns {string} - HTML with abbreviations wrapped in <abbr>
 */
function wrapAbbreviations(html) {
	const romanNumeralPattern = /^(?=[MDCLXVI])M{0,4}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;

	const segments = html.split(/(<[^>]+>)/);
	const result = [];

	let excludedWrapper = 0;
	let insideAbbr = false;

	for (let i = 0; i < segments.length; i++) {
		const segment = segments[i];

		if (segment.startsWith("<") && segment.endsWith(">")) {
			result.push(segment);

			if (segment.match(/^<(code|script|style)[^>]*>/i)) {
				excludedWrapper++;
			} else if (segment.match(/^<\/(code|script|style)>/i)) {
				excludedWrapper--;
			} else if (segment.match(/^<abbr[^>]*>/i)) {
				insideAbbr = true;
			} else if (segment.match(/^<\/abbr>/i)) {
				insideAbbr = false;
			}
			continue;
		}

		if (excludedWrapper > 0 || insideAbbr || !segment) {
			result.push(segment);
			continue;
		}

		const processedSegment = segment.replace(/\b(?:\d+[A-Z]+[a-z]*|[A-Z]{3,}[a-z]*)\b/g, (match) => {
			const capitalMatch = match.match(/[A-Z]+/);
			if (!capitalMatch) return match;

			const capitalPortion = capitalMatch[0];

			if (/^\d/.test(match)) {
				const capitalPart = match.match(/\d+[A-Z]+/)[0];
				const lowercasePart = match.substring(capitalPart.length);
				return `<abbr>${capitalPart}</abbr>${lowercasePart}`;
			}

			if (romanNumeralPattern.test(capitalPortion)) {
				return match;
			}

			const lowercasePart = match.match(/[a-z]*$/)[0];
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
