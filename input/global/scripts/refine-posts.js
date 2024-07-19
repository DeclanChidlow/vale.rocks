const refineBar = document.getElementById("refine-posts"),
	postsSearch = document.getElementById("posts-search"),
	postsFilter = document.getElementById("posts-filter"),
	postItems = document.getElementById("post-items"),
	posts = Array.from(postItems.querySelectorAll(".post"));

refineBar.style.display = "flex";

postsSearch.addEventListener("input", handleSearch);
postsFilter.addEventListener("change", handleFilter);
document.addEventListener("keydown", handleShortcut);

function handleSearch() {
	const searchTerm = postsSearch.value.trim().toLowerCase();
	filterPosts(searchTerm, postsFilter.value);
}

function handleFilter() {
	const searchTerm = postsSearch.value.trim().toLowerCase();
	filterPosts(searchTerm, postsFilter.value);
}

function filterPosts(searchTerm, filterValue) {
	posts.forEach((post) => {
		const postContent = post.textContent.trim().toLowerCase(),
			postType = post.querySelector("p").textContent.trim().toUpperCase(),
			matchesSearch = searchTerm === "" || postContent.includes(searchTerm),
			matchesFilter = filterValue.toUpperCase() === "ALL" || postType === filterValue.toUpperCase();
		post.style.display = matchesSearch && matchesFilter ? "" : "none";
	});
}

function handleShortcut(event) {
	if (event.key === "/" && document.activeElement !== postsSearch) {
		event.preventDefault();
		postsSearch.focus();
	} else if (event.key === "Escape" && document.activeElement === postsSearch) {
		event.preventDefault();
		postsSearch.value = "";
		handleSearch();
		postsSearch.blur();
	}
}
