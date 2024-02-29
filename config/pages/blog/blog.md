<head>
    <title>Blog | Vale.Rocks</title>
    <meta property="og:title" content="Blog | Vale.Rocks"/>
    <meta name="description" content="The internet website of Declan Chidlow, known online as Vale. Within this digital domain, I document my thoughts, musings, and otherwise unhinged ramblings. I hope you stick around and find at least something intriguing here. I've put a lot of time into it. " />
    <meta property="og:description" content="The hippest site this side of MySpace." />
</head>

<style>
#blogposts {
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 5rem;
	gap: 2%;
	justify-content: space-between;
}

#blogposts div{
	border-bottom: 2px solid var(--bright_grey);
	flex-basis: 46%;
 	box-sizing: border-box;
	height: 8rem;
	padding: 0.5rem 0;
	overflow: hidden;
	text-overflow: ellipsis;
}

#blogposts h3 {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	word-wrap: break-word;
	text-overflow: ellipsis;
	overflow: hidden;
}

#blogposts p {
	text-transform: uppercase;
	margin: 0;
}

#searchAndFilter {
	/* set to flex in JS */
	gap: 2%;
}

input#blogsearch {
	flex: 1;
	min-width: 0;
}

@keyframes fadeInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
.fade-in-up {
  animation: 0.5s both fadeInUp;
} 

@media (max-width: 1000px) {
    #blogposts {
	    flex-direction: column;
    }

    #blogposts div{
	    flex-basis: 100%;
    }
}
</style>

<h1 id="section">
    Blog
</h1>

<search id="searchAndFilter" style="display:none;">
    <input type="search" id="blogsearch" onkeyup="search()" placeholder="Search posts">
    <select name="tag" id="tag">
        <option value="all">All</option>
        <option value="review">Reviews</option>
        <option value="essay">Essays</option>
        <option value="tutorial">Tutorials</option>
        <option value="meta">Meta</option>
    </select>
</search>

<div id="blogposts">

<div class="post">

Essay
### [Cybersecurity Superstition](/blog/Cybersecurity_Superstition)
<time datetime="2024-02-28">28 Feb, 2024</time> | 1586 words | 5 minute read
</div>

<div class="post">

Review
### [I Hate My Nokia](/blog/I_Hate_My_Nokia)
<time datetime="2024-02-03">03 Feb, 2024</time> | 926 words | 3 minute read
</div>

<div class="post">

Essay
### [Everything Is Chrome](/blog/Everything_Is_Chrome)
<time datetime="2023-12-11">11 Dec, 2023</time> | 2256 words | 8 minute read
</div>

<div class="post">

Review
### [A Year With The Framework Laptop 13](/blog/A_Year_With_The_Framework_Laptop_13)
<time datetime="2023-12-01">01 Dec, 2023</time> | 1495 words | 5 minute read
</div>

<div class="post">

Essay
### [Prematurely Pulling the Plug on 3G](/blog/Prematurely_Pulling_The_Plug_On_3G)
<time datetime="2023-11-26">26 Nov, 2023</time> | 912 words | 3 minute read
</div>

<div class="post">

Tutorial
### [Making Windows "Usable"](/blog/Making_Windows_Usable)
<time datetime="2023-10-31">31 Oct, 2023</time> | 1150 words | 4 minute read
</div>

<div class="post">

Review
### [Halo: My Thoughts](/blog/Halo_My_Thoughts)
<time datetime="2023-08-27">27 Aug, 2023</time> | 3235 words | 11 minute read
</div>

<div class="post">

Tutorial
### [Ultimate LibreOffice Setup](/blog/LibreOffice_Setup)
<time datetime="2023-06-16">16 Jul, 2023</time> | 1087 words | 4 minute read
</div>

<div class="post">

Tutorial
### [Connecting to Australian School Internet](/blog/School_Internet)
<time datetime="2022-10-12">12 Oct, 2022</time> | 539 words | 2 minute read
</div>

<div class="post">

Meta
### [Welcome](/blog/Welcome)
<time datetime="2022-09-12">12 Sep, 2022</time> | 559 words | 2 minute read
</div>

</div>

<script src="assets/scrollfade.js"></script>

<script>
    document.getElementById("searchAndFilter").style.display = 'flex';
</script>

<script>
// Search posts
    function search() {
        var input = document.getElementById('blogsearch');
        var filter = input.value.toUpperCase();
        var ul = document.getElementById("blogposts");
        var divs = ul.querySelectorAll('div');

    divs.forEach(function(div) {
        var a = div.querySelector("a");
        var txtValue = a.textContent;
        var displayStyle = (txtValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
        div.style.display = displayStyle;
    });
    }
</script>

<script>
// Filter posts
    const tagSelect = document.getElementById('tag');
    const blogPosts = document.getElementById('blogposts');

    tagSelect.addEventListener('change', filterPosts);

    function filterPosts() {
        const selectedTag = tagSelect.value.toUpperCase();
        const divs = blogPosts.querySelectorAll('div');
        divs.forEach(div => {
            const postInfo = div.textContent.trim().split('\n');
            const postType = postInfo[0].toUpperCase();
            const displayStyle = (selectedTag === 'ALL' || postType === selectedTag) ? "" : "none";
            div.style.display = displayStyle;
        });
    }
</script>
