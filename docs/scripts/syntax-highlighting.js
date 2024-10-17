// Based on https://brandur.org/fragments/shiki
import { codeToHtml } from "https://esm.sh/shiki@1.22.0";

const htmlEscapes = new Map([
	["&amp;", "&"],
	["&lt;", "<"],
	["&gt;", ">"],
	["&quot;", '"'],
	["&#39;", "'"],
]);

function unescapeHTMLEntities(str) {
	return str.replace(/&(?:amp|lt|gt|quot|#39);/g, (match) => htmlEscapes.get(match));
}

const getLanguageFromClassNames = (classNames) => {
	if (!classNames) return null;
	const languageClass = classNames.split(" ").find((c) => c.startsWith("language-"));
	return languageClass ? languageClass.slice(9).toLowerCase() : null;
};

const processCodeBlock = async (codeBlock) => {
	const language = getLanguageFromClassNames(codeBlock.className);
	if (!language) return;

	const code = unescapeHTMLEntities(codeBlock.textContent.trim());
	const highlightedCode = await codeToHtml(code, {
		lang: language,
		theme: "vitesse-dark",
	});

	const tempElement = document.createElement("div");
	tempElement.innerHTML = highlightedCode;
	codeBlock.parentElement.replaceWith(tempElement.firstElementChild);
};

const highlightAllCodeBlocks = async () => {
	const codeBlocks = document.querySelectorAll("pre code");
	await Promise.all(Array.from(codeBlocks).map(processCodeBlock));
};

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", highlightAllCodeBlocks);
} else {
	await highlightAllCodeBlocks();
}
