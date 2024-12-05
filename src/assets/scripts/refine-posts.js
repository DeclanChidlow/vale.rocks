const refineBar = document.getElementById("refine-posts"),
	postsSearch = document.getElementById("posts-search"),
	postsFilter = document.getElementById("posts-filter"),
	postsSorter = document.getElementById("posts-sort"),
	postItems = document.getElementById("post-items"),
	posts = Array.from(postItems.querySelectorAll(".post"));

refineBar.style.display = "flex";
postsSearch.addEventListener("input", filterAndSortPosts);
postsFilter.addEventListener("change", filterAndSortPosts);
postsSorter.addEventListener("change", filterAndSortPosts);
document.addEventListener("keydown", handleShortcut);

function filterAndSortPosts() {
	const searchTerm = postsSearch.value.trim().toLowerCase(),
		filterValue = postsFilter.value.toUpperCase(),
		sortValue = postsSorter.value;

	const filteredPosts = posts.filter((post) => {
		const postContent = post.textContent.trim().toLowerCase(),
			postType = post.querySelector("p").textContent.trim().toUpperCase();
		return (filterValue === "ALL" || postType === filterValue) && (searchTerm === "" || postContent.includes(searchTerm));
	});

	const sortedPosts = sortPosts(filteredPosts, sortValue);

	postItems.innerHTML = "";
	if (sortedPosts.length === 0) {
		const noResultsMessage = document.createElement("div");
		noResultsMessage.classList.add("no-results");
		noResultsMessage.textContent = "No results found.";
		postItems.appendChild(noResultsMessage);
	} else {
		sortedPosts.forEach((post) => {
			postItems.appendChild(post);
		});
	}
}

function sortPosts(posts, sortValue) {
	return [...posts].sort((a, b) => {
		const aInfo = getPostInfo(a),
			bInfo = getPostInfo(b);

		switch (sortValue) {
			case "revised-desc":
				return bInfo.revised - aInfo.revised;
			case "revised-asc":
				return aInfo.revised - bInfo.revised;
			case "published-desc":
				return bInfo.published - aInfo.published;
			case "published-asc":
				return aInfo.published - bInfo.published;
			case "length-desc":
				return bInfo.length - aInfo.length;
			case "length-asc":
				return aInfo.length - bInfo.length;
			default:
				return 0;
		}
	});
}

function getPostInfo(post) {
	const infoElements = post.querySelectorAll(".info p");
	const wordCount = parseInt(infoElements[0].textContent);
	const published = new Date(infoElements[1].textContent).getTime();
	const revised = infoElements.length > 2 ? new Date(infoElements[2].textContent).getTime() : published;
	return { length: wordCount, published, revised };
}

function handleShortcut(event) {
	if (event.key === "/" && document.activeElement !== postsSearch) {
		event.preventDefault();
		postsSearch.focus();
	} else if (event.key === "Escape" && document.activeElement === postsSearch) {
		event.preventDefault();
		postsSearch.value = "";
		filterAndSortPosts();
		postsSearch.blur();
	}
}
