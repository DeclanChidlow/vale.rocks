// Show refine bar if user has JS enabled
document.getElementById("refine-posts").style.display = "flex"

const blogPosts = document.getElementById("blog-posts"),
	blogSearch = document.getElementById("blog-search"),
	blogFilter = document.getElementById("blog-filter"),
	posts = blogPosts.querySelectorAll("div");

blogSearch.addEventListener("keyup", searchPosts);
blogFilter.addEventListener("change", filterPosts);

document.addEventListener("keydown", function (event) {
	if (event.key === "/") {
		event.preventDefault();
		blogSearch.focus();
	}
});

function searchPosts() {
	const blogSearchSanitised = blogSearch.value.toUpperCase();

	posts.forEach((div) => {
		const a = div.querySelector("a"),
			txtValue = a.textContent.trim().toUpperCase();
		div.style.display = txtValue.includes(blogSearchSanitised) ? "" : "none";
	});
}

function filterPosts() {
	const blogFilterSanitised = blogFilter.value.toUpperCase();

	posts.forEach((div) => {
		const [postType] = div.textContent
				.trim()
				.split("\n")
				.map((line) => line.toUpperCase());
		div.style.display = blogFilterSanitised === "ALL" || postType === blogFilterSanitised ? "" : "none";
	});
}
