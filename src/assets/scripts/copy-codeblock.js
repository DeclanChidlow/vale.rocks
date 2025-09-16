class CodeBlockCopy {
	constructor() {
		this.codeBlocks = document.querySelectorAll("pre code");
		this.copyIcon = `<svg viewBox="0 -960 960 960"><title>Copy codeblock</title><path d="M280-240v-640h520v640H280Zm80-80h360v-480H360v480ZM120-80v-640h80v560h440v80H120Zm240-240v-480 480Z"/></svg>`;
		this.checkIcon = `<svg viewBox="0 -960 960 960"><title>Codeblock copied</title><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>`;
		this.init();
	}

	createButton(id) {
		const button = document.createElement("button");
		button.className = "copy-button";
		button.innerHTML = this.copyIcon;
		button.setAttribute("aria-describedby", id);
		return button;
	}

	async copyCode(codeBlock, button) {
		try {
			await navigator.clipboard.writeText(codeBlock.innerText);
			button.innerHTML = this.checkIcon;
			button.classList.add("copied");
			setTimeout(() => {
				button.innerHTML = this.copyIcon;
				button.classList.remove("copied");
			}, 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
			button.innerHTML = "!";
			button.classList.add("error");
			setTimeout(() => {
				button.innerHTML = this.copyIcon;
				button.classList.remove("error");
			}, 2000);
		}
	}

	init() {
		this.codeBlocks.forEach((code, i) => {
			const pre = code.parentElement;
			const wrapper = document.createElement("div");
			wrapper.className = "code-block-wrapper";
			wrapper.dir = "ltr";

			const id = `code-block-${i}`;
			code.id = id;

			const button = this.createButton(id);
			button.addEventListener("click", () => this.copyCode(code, button));

			pre.parentNode.insertBefore(wrapper, pre);
			wrapper.appendChild(pre);
			wrapper.insertBefore(button, pre);
		});
	}
}

document.addEventListener("DOMContentLoaded", () => new CodeBlockCopy());
