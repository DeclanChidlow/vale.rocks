// Based upon https://github.com/paulirish/lite-youtube-embed

class YtEmbed extends HTMLElement {
	connectedCallback() {
		this.videoId = this.getAttribute("videoid");

		const playButton = document.createElement("button");
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
		iframe.src = `https://www.youtube-nocookie.com/embed/${this.videoId}?autoplay=1&rel=0&enablejsapi=1`;
		iframe.referrerPolicy = "strict-origin-when-cross-origin";
		iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
		iframe.allowFullscreen = true;
		return iframe;
	}

	loadVideo() {
		const playButton = this.querySelector(".play");
		if (playButton) playButton.remove();

		const iframe = this.createIframe();
		this.append(iframe);

		iframe.focus();

		this.initYouTubeAPI(iframe);
	}

	initYouTubeAPI(iframe) {
		if (!window.YT) {
			const tag = document.createElement("script");
			tag.src = "https://www.youtube.com/iframe_api";
			const firstScriptTag = document.getElementsByTagName("script")[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		}

		const initPlayer = () => {
			this.player = new YT.Player(iframe, {
				events: {
					onStateChange: this.onPlayerStateChange.bind(this),
				},
			});
		};

		if (window.YT && window.YT.Player) {
			initPlayer();
		} else {
			const previousCallback = window.onYouTubeIframeAPIReady;
			window.onYouTubeIframeAPIReady = () => {
				if (previousCallback) previousCallback();
				initPlayer();
			};
		}
	}

	onPlayerStateChange(event) {
		if (event.data === 1) {
			this.startPolling();
		} else {
			this.stopPolling();
		}
	}

	startPolling() {
		this.stopPolling();
		this.pollInterval = setInterval(() => {
			if (this.player && this.player.getCurrentTime) {
				const time = this.player.getCurrentTime();
				this.syncTranscript(time);
			}
		}, 100);
	}

	stopPolling() {
		if (this.pollInterval) clearInterval(this.pollInterval);
	}

	syncTranscript(currentTime) {
		const transcriptContainer = document.getElementById("transcript-container");
		if (!transcriptContainer) return;

		const captionLines = transcriptContainer.querySelectorAll("span");
		let activeLine = null;

		captionLines.forEach((line) => {
			const start = parseFloat(line.dataset.start);
			const end = parseFloat(line.dataset.end);
			const isMarked = line.querySelector("mark");

			if (currentTime >= start && currentTime <= end) {
				if (!isMarked) {
					line.innerHTML = `<mark>${line.textContent}</mark>`;
				}
				activeLine = line;
			} else if (isMarked) {
				line.innerHTML = line.textContent;
			}
		});

		if (activeLine) {
			const containerCenter = transcriptContainer.clientHeight / 2;
			const lineOffset = activeLine.offsetTop - transcriptContainer.offsetTop;

			transcriptContainer.scrollTo({
				top: lineOffset - containerCenter + activeLine.clientHeight / 2,
				behavior: "smooth",
			});
		}
	}
}

customElements.define("youtube-embed", YtEmbed);
