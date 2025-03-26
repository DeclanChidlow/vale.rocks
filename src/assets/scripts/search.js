window.addEventListener("DOMContentLoaded", (event) => {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const searchString = urlParams.get("q");

	const pagefind = new PagefindUI({
		element: "#search",
		pageSize: 10,
		showSubResults: true,
		showImages: false,
		excerptLength: 30,
		resetStyles: false,
		autofocus: true,
	});

	const updateUrlQuery = (query) => {
		const newUrl = new URL(window.location);
		if (query) {
			newUrl.searchParams.set("q", query);
		} else {
			newUrl.searchParams.delete("q");
		}
		window.history.pushState({}, "", newUrl);
	};

	if (searchString) {
		pagefind.triggerSearch(searchString);
	}

	const searchInput = document.querySelector(".pagefind-ui__search-input");
	if (searchInput) {
		searchInput.addEventListener("input", (e) => {
			const query = e.target.value.trim();
			updateUrlQuery(query);
		});
	}

	const observer = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.addedNodes.length) {
				document.querySelectorAll(".pagefind-ui__result-link").forEach((link) => {
					const url = new URL(link.href);
					if (url.pathname.includes(".html")) {
						url.pathname = url.pathname.replace(".html", "");
						link.href = url.toString();
					}
				});
			}
		});
	});

	const searchResults = document.querySelector("#search");
	observer.observe(searchResults, {
		childList: true,
		subtree: true,
	});
});
