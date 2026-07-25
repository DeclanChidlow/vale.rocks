class CopyMaths {
	constructor() {
		if (!document.querySelector("math[data-tex]")) return;
		this.init();
	}

	init() {
		document.addEventListener("copy", this.onCopy.bind(this));
	}

	onCopy(e) {
		const selection = window.getSelection();
		if (!selection.rangeCount) return;

		const range = selection.getRangeAt(0);
		if (range.collapsed) return;

		const fragment = range.cloneContents();
		const mathInFrag = fragment.querySelectorAll("math[data-tex]");

		let plainText;
		let html;

		if (mathInFrag.length) {
			const container = document.createElement("div");
			container.appendChild(fragment);

			const plainClone = container.cloneNode(true);
			for (const math of plainClone.querySelectorAll("math[data-tex]")) {
				const tex = math.getAttribute("data-tex");
				const isBlock = math.getAttribute("display") === "block";
				math.replaceWith(document.createTextNode(isBlock ? `$$\n${tex}\n$$` : `$${tex}$`));
			}
			plainText = plainClone.textContent;
			html = container.innerHTML;
		} else {
			const touched = [];
			for (const container of [range.startContainer, range.endContainer]) {
				let node = container;
				while (node && node.nodeType !== Node.DOCUMENT_NODE) {
					if (node.nodeType === Node.ELEMENT_NODE && node.matches("math[data-tex]")) {
						if (!touched.includes(node)) touched.push(node);
						break;
					}
					node = node.parentNode;
				}
			}
			if (!touched.length) return;

			plainText = touched
				.map((math) => {
					const tex = math.getAttribute("data-tex");
					const isBlock = math.getAttribute("display") === "block";
					return isBlock ? `$$\n${tex}\n$$` : `$${tex}$`;
				})
				.join("\n");
			html = touched.map((math) => math.outerHTML).join("");
		}

		e.preventDefault();
		e.clipboardData.setData("text/plain", plainText);
		e.clipboardData.setData("text/html", html);
	}
}

document.addEventListener("DOMContentLoaded", () => new CopyMaths());
