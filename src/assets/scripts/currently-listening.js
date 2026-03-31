class ListeningStatus {
	constructor(elementId) {
		this.displayElement = document.getElementById(elementId);
		if (!this.displayElement) return;

		this.baseText = this.displayElement.textContent;
		this.apiUrl = "https://api.listenbrainz.org/1/user/OuterVale/playing-now";

		this.init();
	}

	async update() {
		try {
			const response = await fetch(this.apiUrl);
			const data = await response.json();
			const listen = data?.payload?.listens?.[0];
			const meta = listen?.track_metadata;
			let nextCheck = 30000;

			if (listen?.playing_now && meta) {
				this.renderTrack(meta);

				if (meta.additional_info?.duration) {
					nextCheck = meta.additional_info.duration * 1000 + 2500;
				}
			} else {
				this.clearDisplay();
			}

			setTimeout(() => this.update(), nextCheck);
		} catch (error) {
			setTimeout(() => this.update(), 30000);
		}
	}

	renderTrack(meta) {
		const { track_name, artist_name, release_name } = meta;

		this.displayElement.textContent = this.baseText;

		const trackEm = document.createElement("em");
		trackEm.textContent = track_name;
		this.displayElement.appendChild(trackEm);

		if (artist_name) {
			this.displayElement.appendChild(document.createTextNode(" by "));
			const artistEm = document.createElement("em");
			artistEm.id = "artist";
			artistEm.textContent = artist_name;
			this.displayElement.appendChild(artistEm);
		}

		if (release_name) {
			this.displayElement.appendChild(document.createTextNode(" from the album "));
			const albumEm = document.createElement("em");
			albumEm.id = "album";
			albumEm.textContent = release_name;
			this.displayElement.appendChild(albumEm);
		}

		this.displayElement.appendChild(document.createTextNode("."));
		this.displayElement.style.display = "revert";
	}

	clearDisplay() {
		this.displayElement.textContent = this.baseText;
		this.displayElement.style.display = "none";
	}

	init() {
		this.update();
	}
}

new ListeningStatus("currently-listening");
