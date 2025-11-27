// Based upon https://github.com/paulirish/lite-youtube-embed

class YtEmbed extends HTMLElement {
	connectedCallback() {
		this.videoId = this.getAttribute("videoid");

		let playButton = this.querySelector(".play");
		playButton = document.createElement("button");
		playButton.type = "button";
		playButton.className = "play";
		playButton.textContent = this.getAttribute("playlabel") || "Play";
		this.append(playButton);

		// Add noscript iframe for SEO
		// https://github.com/paulirish/lite-youtube-embed/issues/105
		this.addNoscript();

		this.addEventListener("pointerover", YtEmbed.warmConnections, { once: true });
		this.addEventListener("click", () => this.loadVideo(), { once: true });
	}

	static warmConnections() {
		if (YtEmbed.preconnected) return;

		const addLink = (url) => {
			const link = document.createElement("link");
			link.rel = "preconnect";
			link.href = url;
			document.head.append(link);
		};

		addLink("https://www.youtube-nocookie.com");
		addLink("https://www.google.com");
		YtEmbed.preconnected = true;
	}

	addNoscript() {
		const iframe = this.createIframe();
		const noscript = document.createElement("noscript");
		noscript.innerHTML = iframe.outerHTML;
		this.append(noscript);
	}

	createIframe() {
		const iframe = document.createElement("iframe");
		iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1`;
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
		iframe.allowFullscreen = true;
		return iframe;
	}

	loadVideo() {
		const playButton = this.querySelector(".play");
		if (playButton) playButton.remove();

		const iframe = this.createIframe();
		this.append(iframe);

		iframe.focus();
	}
}

customElements.define("youtube-embed", YtEmbed);
