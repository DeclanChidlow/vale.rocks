class CurrentMedia {
	constructor() {
		this.musicEl = document.getElementById("currently-listening");
		this.gameEl = document.getElementById("currently-playing");
		this.filmEl = document.getElementById("currently-watching");

		if (!this.musicEl && !this.gameEl && !this.filmEl) return;

		if (this.musicEl) {
			this.musicBase = this.musicEl.textContent;
			this.musicApi = "https://api.listenbrainz.org/1/user/OuterVale/playing-now";
		}

		if (this.gameEl || this.filmEl) {
			if (this.gameEl) this.gameBase = this.gameEl.textContent;
			if (this.filmEl) this.filmBase = this.filmEl.textContent;
			this.gameApi = "https://game-activity.cloudflare-7twxg.workers.dev/";
		}

		this.handleVisibility = this.handleVisibility.bind(this);
		document.addEventListener("visibilitychange", this.handleVisibility);

		this.init();
	}

	async updateMusic() {
		if (!this.musicEl) return;

		try {
			const response = await fetch(this.musicApi);
			const data = await response.json();
			const listen = data?.payload?.listens?.[0];
			const meta = listen?.track_metadata;
			let nextCheck = 30000;

			if (listen?.playing_now && meta) {
				this.renderTrack(meta);

				if (meta.additional_info?.duration) {
					nextCheck = Math.min(meta.additional_info.duration * 1000 + 2500, 600000);
				}
			} else {
				this.clearMusic();
			}

			this.scheduleMusic(nextCheck);
		} catch {
			this.scheduleMusic(30000);
		}
	}

	async updateGame() {
		if (!this.gameEl && !this.filmEl) return;

		try {
			const response = await fetch(this.gameApi);
			const data = await response.json();

			if (this.gameEl) {
				const status = this.findGameStatus(data);

				if (status) {
					this.renderGame(status);
				} else {
					this.clearGame();
				}
			}

			if (this.filmEl) {
				const media = this.findFilmStatus(data);

				if (media) {
					this.renderFilm(media);
				} else {
					this.clearFilm();
				}
			}

			this.scheduleGame(30000);
		} catch {
			this.scheduleGame(30000);
		}
	}

	scheduleMusic(delay) {
		clearTimeout(this.musicTimer);
		if (!document.hidden) {
			this.musicTimer = setTimeout(() => this.updateMusic(), delay);
		}
	}

	scheduleGame(delay) {
		clearTimeout(this.gameTimer);
		if (!document.hidden) {
			this.gameTimer = setTimeout(() => this.updateGame(), delay);
		}
	}

	handleVisibility() {
		if (document.hidden) {
			clearTimeout(this.musicTimer);
			clearTimeout(this.gameTimer);
		} else {
			if (this.musicEl) this.updateMusic();
			if (this.gameEl || this.filmEl) this.updateGame();
		}
	}

	findGameStatus(data) {
		const platforms = ["xbox", "steam"];
		let idle = null;

		for (const platform of platforms) {
			const entry = data[platform];
			if (!entry) continue;
			const displayName = CurrentMedia.deviceName(entry.device, platform);
			if (entry.game) {
				return {
					game: entry.game,
					device: displayName,
					richPresence: entry.richPresence || null,
					idle: false,
				};
			}
			if (!idle && entry.online) {
				idle = { device: displayName, idle: true, platform };
			}
		}

		return idle;
	}

	findFilmStatus(data) {
		const jf = data?.jellyfin;
		if (!jf?.active || !jf?.media) return null;
		return jf.media;
	}

	static deviceName(raw, platform) {
		if (platform === "steam") return "Steam";
		const names = {
			Scarlett: "Xbox Series X|S",
			XboxOne: "Xbox One",
			XboxSeriesX: "Xbox Series X",
			XboxSeriesS: "Xbox Series S",
			WindowsOneCore: "PC",
			iOS: "iOS",
			Android: "Android",
			Web: "Xbox Cloud Gaming",
		};
		return names[raw] || raw || platform.charAt(0).toUpperCase() + platform.slice(1);
	}

	renderTrack(meta) {
		const { track_name, artist_name, release_name } = meta;

		this.musicEl.textContent = this.musicBase;

		const trackEm = document.createElement("em");
		trackEm.textContent = track_name;
		this.musicEl.appendChild(trackEm);

		if (artist_name) {
			this.musicEl.appendChild(document.createTextNode(" by "));
			const artistEm = document.createElement("em");
			artistEm.id = "artist";
			artistEm.textContent = artist_name;
			this.musicEl.appendChild(artistEm);
		}

		if (release_name) {
			this.musicEl.appendChild(document.createTextNode(" from the album "));
			const albumEm = document.createElement("em");
			albumEm.id = "album";
			albumEm.textContent = release_name;
			this.musicEl.appendChild(albumEm);
		}

		this.musicEl.appendChild(document.createTextNode("."));
		this.musicEl.style.display = "revert";
	}

	renderGame(status) {
		if (status.idle) {
			const verb = status.platform === "xbox" ? "online on " : "idling on ";
			this.gameEl.textContent = this.gameBase.replace(/playing/i, verb);
		} else {
			this.gameEl.textContent = this.gameBase;
			const gameEm = document.createElement("em");
			gameEm.textContent = status.game;
			this.gameEl.appendChild(gameEm);

			if (status.richPresence) {
				this.gameEl.appendChild(document.createTextNode(` (${status.richPresence})`));
			}

			this.gameEl.appendChild(document.createTextNode(" on "));
		}

		const deviceEm = document.createElement("em");
		deviceEm.textContent = status.device;
		this.gameEl.appendChild(deviceEm);
		this.gameEl.appendChild(document.createTextNode("."));
		this.gameEl.style.display = "revert";
	}

	renderFilm(media) {
		this.filmEl.textContent = this.filmBase;

		if (media.type === "tv") {
			const showEm = document.createElement("em");
			showEm.textContent = media.show;
			this.filmEl.appendChild(showEm);

			const details = [];
			if (media.season) details.push(`Season ${media.season}`);
			if (media.episode) details.push(`Episode ${media.episode}`);

			if (details.length) {
				this.filmEl.appendChild(document.createTextNode(` – ${details.join(", ")}`));

				if (media.episodeName) {
					this.filmEl.appendChild(document.createTextNode(": "));
					const epEm = document.createElement("em");
					epEm.textContent = media.episodeName;
					this.filmEl.appendChild(epEm);
				}
			}
		} else {
			const titleEm = document.createElement("em");
			titleEm.textContent = media.title;
			this.filmEl.appendChild(titleEm);

			if (media.year) {
				this.filmEl.appendChild(document.createTextNode(` (${media.year})`));
			}
		}

		this.filmEl.appendChild(document.createTextNode("."));
		this.filmEl.style.display = "revert";
	}

	clearMusic() {
		this.musicEl.textContent = this.musicBase;
		this.musicEl.style.display = "none";
	}

	clearGame() {
		this.gameEl.textContent = this.gameBase;
		this.gameEl.style.display = "none";
	}

	clearFilm() {
		this.filmEl.textContent = this.filmBase;
		this.filmEl.style.display = "none";
	}

	init() {
		if (this.musicEl) this.updateMusic();
		if (this.gameEl || this.filmEl) this.updateGame();
	}
}

new CurrentMedia();
