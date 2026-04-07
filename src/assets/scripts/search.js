window.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.querySelector(".pf-input");
	const clearButton = document.querySelector(".pf-input-clear");

	if (!searchInput) return;

	searchInput.focus();

	const updateUrlQuery = (query) => {
		const newUrl = new URL(window.location);
		if (query) {
			newUrl.searchParams.set("q", query);
		} else {
			newUrl.searchParams.delete("q");
		}
		window.history.replaceState({}, "", newUrl);
	};

	const urlParams = new URLSearchParams(window.location.search);
	const searchString = urlParams.get("q");

	if (searchString) {
		searchInput.value = searchString;
		searchInput.dispatchEvent(new Event("input", { bubbles: true }));
	}

	searchInput.addEventListener("input", (e) => {
		const query = e.target.value.trim();
		updateUrlQuery(query);
	});

	if (clearButton) {
		clearButton.addEventListener("click", () => {
			updateUrlQuery("");
		});
	}
});
