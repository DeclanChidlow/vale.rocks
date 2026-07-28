class CurrentMedia {
	static LAST_SEEN_WINDOW = 10 * 60 * 1000;
	static LAST_PLAYED_REGEX = /\bI(?:'m|\s+am)\s+playing\b/i;
	static LAST_PLAYED_TEXT = "I've just wrapped up playing";

	static parseTs(ts) {
		const normalised = ts.endsWith("Z") ? ts : ts + "Z";
		return new Date(normalised.replace(/\.(\d{3})\d+Z$/, ".$1Z"));
	}

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

			let hasFilm = false;

			if (this.filmEl) {
				const media = this.findFilmStatus(data);

				if (media) {
					this.renderFilm(media);
					hasFilm = true;
				} else {
					this.clearFilm();
				}
			}

			if (this.gameEl) {
				const status = this.findGameStatus(data);

				if (status?.lastPlayed && hasFilm) {
					this.clearGame();
				} else if (status) {
					this.renderGame(status);
				} else {
					this.clearGame();
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
		let recentLastSeen = null;

		for (const platform of platforms) {
			const entry = data[platform];
			if (!entry) continue;

			if (platform === "xbox") {
				if (entry.activeTitle?.name) {
					return {
						game: entry.activeTitle.name,
						device: CurrentMedia.deviceName(entry.activeTitle.deviceType, platform),
						richPresence: entry.activeTitle.richPresence || null,
						idle: false,
					};
				}
			} else if (entry.game) {
				return {
					game: entry.game,
					device: CurrentMedia.deviceName(entry.device, platform),
					richPresence: entry.richPresence || null,
					idle: false,
				};
			}

			if (!idle && entry.online) {
				idle = { device: CurrentMedia.deviceName(entry.device, platform), idle: true, platform };
			}

			if (!recentLastSeen && entry.lastSeen) {
				const lastSeenTime = CurrentMedia.parseTs(entry.lastSeen.timestamp).getTime();
				if (lastSeenTime > Date.now() - CurrentMedia.LAST_SEEN_WINDOW) {
					recentLastSeen = {
						game: entry.lastSeen.titleName,
						device: CurrentMedia.deviceName(entry.lastSeen.deviceType, platform),
						idle: false,
						lastPlayed: true,
					};
				}
			}
		}

		return recentLastSeen || idle;
	}

	findFilmStatus(data) {
		const jf = data?.jellyfin;
		if (!jf?.active || !jf?.media) return null;
		return jf.media;
	}

	static deviceName(raw, platform) {
		if (platform === "steam") return "Steam";
		const names = {
			Scarlett: "Xbox Series X/S",
			XboxSeriesX: "Xbox Series X",
			XboxSeriesS: "Xbox Series S",
			XboxOne: "Xbox One",
			Xbox360: "Xbox 360",
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
			const verb = status.platform === "xbox" ? "online on " : "idle on ";
			this.gameEl.textContent = this.gameBase.replace(/playing/i, verb);
		} else {
			if (status.lastPlayed) {
				this.gameEl.textContent = this.gameBase.replace(CurrentMedia.LAST_PLAYED_REGEX, CurrentMedia.LAST_PLAYED_TEXT);
			} else {
				this.gameEl.textContent = this.gameBase;
			}
			const gameEm = document.createElement("em");
			gameEm.textContent = status.game;
			this.gameEl.appendChild(gameEm);

			if (!status.lastPlayed && status.richPresence) {
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
