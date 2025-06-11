import { extension, isUnpackable } from "@weborigami/async-tree";
import highlight from "highlight.js";
import { marked } from "marked";
import { gfmHeadingId as markedGfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";
import markedAlert from "marked-alert";
import markedFootnote from "marked-footnote";
import { baseUrl as markedBaseUrl } from "marked-base-url";
import documentObject from "@weborigami/origami/src/common/documentObject.js";
import { toString } from "@weborigami/origami/src/common/utilities.js";
import origamiHighlightDefinition from "@weborigami/origami/src/text/origamiHighlightDefinition.js";

highlight.registerLanguage("ori", origamiHighlightDefinition);

marked.use(
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
 * Wraps strings of three or more capital letters in <abbr> tags
 * Excludes Roman numerals and content already in <abbr> tags
 *
 * @param {string} html - The HTML to process
 * @returns {string} - HTML with abbreviations wrapped in <abbr> tags
 */
function wrapAbbreviations(html) {
	const romanNumeralPattern = /^(?=[MDCLXVI])M{0,4}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;
	const parts = html.split(/(<abbr[^>]*>.*?<\/abbr>)/i);

	return parts
		.map((part, index) => {
			// Skip processing parts that are already <abbr> tags (odd indices after split)
			if (index % 2 === 1) {
				return part;
			}

			// Pattern matches:
			// 1. Numbers followed by capital letters, optionally followed by lowercase
			// 2. 3+ capital letters, optionally followed by lowercase
			return part.replace(/\b(?:\d+[A-Z]+[a-z]*|[A-Z]{3,}[a-z]*)/g, (match) => {
				const capitalPortion = match.match(/[A-Z]+/)[0];

				if (/^\d/.test(match)) {
					const capitalPart = match.match(/\d+[A-Z]+/)[0];
					const lowercasePart = match.substring(capitalPart.length);
					return `<abbr>${capitalPart}</abbr>${lowercasePart}`;
				} else if (romanNumeralPattern.test(capitalPortion)) {
					return match;
				} else {
					const lowercasePart = match.match(/[a-z]*$/)[0];
					const capitalPart = match.substring(0, match.length - lowercasePart.length);
					return `<abbr>${capitalPart}</abbr>${lowercasePart}`;
				}
			});
		})
		.join("");
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
	const inputIsDocument = input["@text"] !== undefined;
	const markdown = toString(input);
	if (markdown === null) {
		throw new Error("mdHtml: The provided input couldn't be treated as text.");
	}

	let html = marked(markdown);
	html = wrapAbbreviations(html);

	return inputIsDocument ? documentObject(html, input) : html;
}

mdHtml.key = (sourceKey) => extension.replace(sourceKey, ".md", ".html");
mdHtml.inverseKey = (resultKey) => extension.replace(resultKey, ".html", ".md");
