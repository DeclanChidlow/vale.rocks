const refineBar = document.getElementById("refine-posts"),
	postsFilter = document.getElementById("posts-filter"),
	postsSorter = document.getElementById("posts-sort"),
	postItems = document.getElementById("posts"),
	posts = Array.from(postItems.querySelectorAll(".post"));

refineBar.style.display = "flex";
postsFilter.addEventListener("change", filterAndSortPosts);
postsSorter.addEventListener("change", filterAndSortPosts);

function filterAndSortPosts() {
	const filterValue = postsFilter.value.toLowerCase(),
		sortValue = postsSorter.value;

	const filteredPosts = posts.filter((post) => {
		const postType = post.querySelector("p").textContent.trim().toLowerCase();
		return filterValue === "all" || postType === filterValue;
	});

	const sortedPosts = sortPosts(filteredPosts, sortValue);

	const fragment = document.createDocumentFragment();

	if (sortedPosts.length === 0) {
		const noResultsMessage = document.createElement("div");
		noResultsMessage.classList.add("no-results");
		noResultsMessage.textContent = "No results found.";
		fragment.appendChild(noResultsMessage);
	} else {
		sortedPosts.forEach((post) => {
			fragment.appendChild(post);
		});
	}

	postItems.innerHTML = "";
	postItems.appendChild(fragment);
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

	const timeElements = infoElements[1].querySelectorAll("time");
	const revised = timeElements.length > 1 ? new Date(timeElements[1].getAttribute("datetime")).getTime() : published;

	return { length: wordCount, published, revised };
}
