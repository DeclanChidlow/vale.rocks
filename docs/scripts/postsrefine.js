// Show refine bar if user has JS enabled
document.getElementById("refine-posts").style.display = "flex";

const postItems = document.getElementById("post-items"),
	postsSearch = document.getElementById("posts-search"),
	postsFilter = document.getElementById("posts-filter"),
	posts = postItems.querySelectorAll(".post");

postsSearch.addEventListener("keyup", searchPosts);
postsFilter.addEventListener("change", filterPosts);

document.addEventListener("keydown", function (event) {
	if (event.key === "/") {
		event.preventDefault();
		postsSearch.focus();
	}
});

function searchPosts() {
	const postsSearchSanitised = postsSearch.value.toUpperCase();

	posts.forEach((a) => {
		const txtValue = a.textContent.trim().toUpperCase();
		a.style.display = txtValue.includes(postsSearchSanitised) ? "" : "none";
	});
}

function filterPosts() {
	const postsFilterSanitised = postsFilter.value.toUpperCase();

	posts.forEach((a) => {
		const postType = a.querySelector("p").textContent.toUpperCase();
		a.style.display = postsFilterSanitised === "ALL" || postType === postsFilterSanitised ? "" : "none";
	});
}
