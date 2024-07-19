const refineBar = document.getElementById("refine-posts"),
	postsSearch = document.getElementById("posts-search"),
	postsFilter = document.getElementById("posts-filter"),
	postItems = document.getElementById("post-items"),
	posts = Array.from(postItems.querySelectorAll(".post"));

refineBar.style.display = "flex";

postsSearch.addEventListener("input", filterPosts);
postsFilter.addEventListener("change", filterPosts);
document.addEventListener("keydown", handleShortcut);

function filterPosts() {
	const searchTerm = postsSearch.value.trim().toLowerCase(),
		filterValue = postsFilter.value.toUpperCase();

	posts.forEach((post) => {
		const postContent = post.textContent.trim().toLowerCase(),
			postType = post.querySelector("p").textContent.trim().toUpperCase();

		const matchesFilter = filterValue === "ALL" || postType === filterValue,
			matchesSearch = searchTerm === "" || postContent.includes(searchTerm);

		post.style.display = matchesFilter && matchesSearch ? "" : "none";
	});
}

function handleShortcut(event) {
	if (event.key === "/" && document.activeElement !== postsSearch) {
		event.preventDefault();
		postsSearch.focus();
	} else if (event.key === "Escape" && document.activeElement === postsSearch) {
		event.preventDefault();
		postsSearch.value = "";
		filterPosts();
		postsSearch.blur();
	}
}
