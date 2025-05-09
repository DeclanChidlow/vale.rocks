import { extension, isUnpackable } from "@weborigami/async-tree";
import highlight from "highlight.js";
import { marked } from "marked";
import { gfmHeadingId as markedGfmHeadingId } from "marked-gfm-heading-id";
import { markedHighlight } from "marked-highlight";
import { markedSmartypants } from "marked-smartypants";
import markedAlert from "marked-alert";
import markedFootnote from "marked-footnote";
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
);

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
	const html = marked(markdown);
	return inputIsDocument ? documentObject(html, input) : html;
}

mdHtml.key = (sourceKey) => extension.replace(sourceKey, ".md", ".html");
mdHtml.inverseKey = (resultKey) => extension.replace(resultKey, ".html", ".md");
