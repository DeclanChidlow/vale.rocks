fetch("https://api.listenbrainz.org/1/user/OuterVale/playing-now")
	.then((r) => r.json())
	.then((data) => {
		const listen = data?.payload?.listens?.[0];
		if (!listen?.playing_now) return;

		const { track_name, artist_name, release_name } = listen.track_metadata || {};
		const msg = [
			track_name ? `<em id="song">${track_name}</em>` : null,
			artist_name ? `<em id="artist">${artist_name}</em>` : null,
			release_name ? `<em id="album">${release_name}</em>` : null,
		].filter(Boolean);

		document.getElementById("currently-listening").innerHTML =
			`At this very moment I’m listening to ${msg[0] || msg[1] || msg[2]}${msg[1] ? ` by ${msg[1]}` : ""}${msg[2] ? ` from the album ${msg[2]}` : ""}.`;
	})
	.catch(console.error);
