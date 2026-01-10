function updateListeningStatus() {
	fetch("https://api.listenbrainz.org/1/user/OuterVale/playing-now")
		.then((r) => r.json())
		.then((data) => {
			const listen = data?.payload?.listens?.[0];
			const meta = listen?.track_metadata;
			let nextCheck = 30000;

			if (listen?.playing_now && meta) {
				const { track_name, artist_name, release_name, additional_info } = meta;

				document.getElementById("currently-listening").innerHTML =
					`At this very moment I’m listening to <em>${track_name}</em>${artist_name ? ` by <em id="artist">${artist_name}</em>` : ""}${release_name ? ` from the album <em id="album">${release_name}</em>` : ""}.`;

				if (additional_info?.duration) {
					nextCheck = additional_info.duration * 1000 + 2500;
				}
			} else {
				document.getElementById("currently-listening").innerHTML = "";
			}

			setTimeout(updateListeningStatus, nextCheck);
		})
		.catch(() => setTimeout(updateListeningStatus, 30000));
}

updateListeningStatus();
