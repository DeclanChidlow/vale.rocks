// Based on https://brandur.org/fragments/shiki

import { codeToHtml } from "https://esm.sh/shiki@1.10.0";

const htmlEscapes = new Map([
	["&amp;", "&"],
	["&lt;", "<"],
	["&gt;", ">"],
]);

function unescapeHTMLEntities(str) {
	for (const [escaped, unescaped] of htmlEscapes) {
		str = str.replaceAll(escaped, unescaped);
	}
	return str;
}

const processCodeBlock = async (codeBlock) => {
	const classNames = codeBlock.getAttribute("class");
	if (!classNames) return;

	const language = classNames
		.split(" ")
		.map((c) => c.split("-"))
		.find(([prefix]) => prefix === "language")
		?.slice(1)
		.join("-")
		.toLowerCase();

	if (!language) return;

	const code = unescapeHTMLEntities(codeBlock.innerHTML);
	const id = codeBlock.getAttribute("id");

	const newOuterHTML = await codeToHtml(code, {
		lang: language,
		theme: "vitesse-dark",
	});

	const parser = new DOMParser();
	const newElement = parser.parseFromString(newOuterHTML, "text/html").body.firstChild;
	if (id) {
		newElement.setAttribute("id", id);
	}

	codeBlock.parentElement.outerHTML = newElement.outerHTML;
};

await Promise.all(Array.from(document.querySelectorAll("pre code")).map(processCodeBlock));
