const refineBar = document.getElementById("refine-posts"),
	postsFilter = document.getElementById("posts-filter"),
	postsSorter = document.getElementById("posts-sort"),
	postItems = document.getElementById("posts"),
	posts = Array.from(postItems.querySelectorAll(".post"));

refineBar.style.display = "flex";
postsFilter.addEventListener("change", filterAndSortPosts);
postsSorter.addEventListener("change", filterAndSortPosts);

function filterAndSortPosts() {
	const filterValue = postsFilter.value.toUpperCase(),
		sortValue = postsSorter.value;

	const filteredPosts = posts.filter((post) => {
		const postType = post.querySelector("p").textContent.trim().toUpperCase();
		return filterValue === "ALL" || postType === filterValue;
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
	const infoElements = post.querySelectorAll("ul li");
	const wordCount = parseInt(infoElements[0].textContent);
	const published = new Date(infoElements[1].querySelector("time").getAttribute("datetime")).getTime();
	const revised = infoElements.length > 2 ? new Date(infoElements[2].querySelector("time").getAttribute("datetime")).getTime() : published;
	return { length: wordCount, published, revised };
}
