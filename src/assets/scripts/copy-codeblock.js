class CodeBlockCopy {
	constructor() {
		this.codeBlocks = document.querySelectorAll("pre code");
		this.copyContent = `<svg viewBox="0 -960 960 960"><title>Copy codeblock</title><path d="M280-240v-640h520v640H280Zm80-80h360v-480H360v480ZM120-80v-640h80v560h440v80H120Zm240-240v-480 480Z"/></svg>`;
		this.checkContent = `<svg viewBox="0 -960 960 960"><title>Codeblock copied</title><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
		this.init();
	}

	init() {
		if (!this.codeBlocks.length) {
			console.warn("No code blocks found");
			return;
		}
		this.setupCodeBlocks();
	}

	createCopyButton(codeBlockId) {
		const button = document.createElement("button");
		button.className = "copy-button";
		button.innerHTML = this.copyContent;
		button.setAttribute("aria-describedby", codeBlockId);
		return button;
	}

	createWrapper() {
		const wrapper = document.createElement("div");
		wrapper.className = "code-block-wrapper";
		return wrapper;
	}

	async copyCode(codeBlock, button) {
		const code = codeBlock.innerText;

		try {
			await navigator.clipboard.writeText(code);
			button.innerHTML = this.checkContent;
			button.classList.add("copied");

			setTimeout(() => {
				button.innerHTML = this.copyContent;
				button.classList.remove("copied");
			}, 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
			button.innerHTML = "!";
			button.classList.add("error");

			setTimeout(() => {
				button.innerHTML = this.copyContent;
				button.classList.remove("error");
			}, 2000);
		}
	}

	setupCodeBlock(codeBlock, index) {
		const pre = codeBlock.parentElement;
		const wrapper = this.createWrapper();
		const codeBlockId = `code-block-${index}`;
		codeBlock.id = codeBlockId;
		const copyButton = this.createCopyButton(codeBlockId);

		pre.parentNode.insertBefore(wrapper, pre);
		wrapper.appendChild(pre);
		wrapper.insertBefore(copyButton, pre);

		copyButton.addEventListener("click", () => this.copyCode(codeBlock, copyButton));
	}

	setupCodeBlocks() {
		this.codeBlocks.forEach((codeBlock, index) => this.setupCodeBlock(codeBlock, index));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new CodeBlockCopy();
});
