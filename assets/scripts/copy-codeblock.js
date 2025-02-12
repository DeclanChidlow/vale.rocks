class CodeBlockCopy {
	constructor() {
		this.codeBlocks = document.querySelectorAll("pre code");
		this.copyIcon = `content_copy`;
		this.checkIcon = `check`;
		this.init();
	}

	init() {
		if (!this.codeBlocks.length) {
			console.warn("No code blocks found");
			return;
		}
		this.setupCodeBlocks();
	}

	createCopyButton() {
		const button = document.createElement("button");
		button.className = "copy-button icons";
		button.innerHTML = this.copyIcon;
		button.setAttribute("aria-label", "Copy code");
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
			button.innerHTML = this.checkIcon;
			button.classList.add("copied");

			setTimeout(() => {
				button.innerHTML = this.copyIcon;
				button.classList.remove("copied");
			}, 2000);
		} catch (err) {
			console.error("Failed to copy code:", err);
			button.innerHTML = "!";
			button.classList.add("error");

			setTimeout(() => {
				button.innerHTML = this.copyIcon;
				button.classList.remove("error");
			}, 2000);
		}
	}

	setupCodeBlock(codeBlock) {
		const pre = codeBlock.parentElement;
		const wrapper = this.createWrapper();
		const copyButton = this.createCopyButton();

		pre.parentNode.insertBefore(wrapper, pre);
		wrapper.appendChild(pre);
		wrapper.insertBefore(copyButton, pre);

		copyButton.addEventListener("click", () => this.copyCode(codeBlock, copyButton));
	}

	setupCodeBlocks() {
		this.codeBlocks.forEach((codeBlock) => this.setupCodeBlock(codeBlock));
	}
}

document.addEventListener("DOMContentLoaded", () => {
	new CodeBlockCopy();
});
