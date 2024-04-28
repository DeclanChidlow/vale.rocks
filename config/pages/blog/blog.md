<h1 id="section">
    Blog
</h1>

<div>

<search id="searchAndFilter">
    <input type="search" id="blogsearch" onkeyup="search()" placeholder="Search posts...">
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

Tutorial
## [My Code Formatting Guidelines](/blog/My_Code_Formatting_Guidelines)
<time datetime="2024-04-18">18 Apr, 2024</time> | 746 words | 3 minute read
</div>

<div class="post">

Review
## [Minecraft, Nostalgia, and Growing Up](/blog/Minecraft_Nostalgia_And_Growing_Up)
<time datetime="2024-04-02">02 Apr, 2024</time> | 1380 words | 5 minute read
</div>

<div class="post">

Essay
## [Cybersecurity Superstition](/blog/Cybersecurity_Superstition)
<time datetime="2024-02-28">28 Feb, 2024</time> | 1896 words | 7 minute read
</div>

<div class="post">

Review
## [I Hate My Nokia](/blog/I_Hate_My_Nokia)
<time datetime="2024-02-03">03 Feb, 2024</time> | 1064 words | 4 minute read
</div>

<div class="post">

Essay
## [Everything Is Chrome](/blog/Everything_Is_Chrome)
<time datetime="2023-12-11">11 Dec, 2023</time> | 2365 words | 8 minute read
</div>

<div class="post">

Review
## [A Year With The Framework Laptop 13](/blog/A_Year_With_The_Framework_Laptop_13)
<time datetime="2023-12-01">01 Dec, 2023</time> | 1495 words | 5 minute read
</div>

<div class="post">

Essay
## [Prematurely Pulling the Plug on 3G](/blog/Prematurely_Pulling_The_Plug_On_3G)
<time datetime="2023-11-26">26 Nov, 2023</time> | 912 words | 3 minute read
</div>

<div class="post">

Tutorial
## [Making Windows "Usable"](/blog/Making_Windows_Usable)
<time datetime="2023-10-31">31 Oct, 2023</time> | 1150 words | 4 minute read
</div>

<div class="post">

Review
## [Halo: My Thoughts](/blog/Halo_My_Thoughts)
<time datetime="2023-08-27">27 Aug, 2023</time> | 3235 words | 11 minute read
</div>

<div class="post">

Tutorial
## [Ultimate LibreOffice Setup](/blog/LibreOffice_Setup)
<time datetime="2023-06-16">16 Jul, 2023</time> | 1087 words | 4 minute read
</div>

<div class="post">

Tutorial
## [Connecting to Australian School Internet](/blog/School_Internet)
<time datetime="2022-10-12">12 Oct, 2022</time> | 780 words | 3 minute read
</div>

<div class="post">

Meta
## [Welcome](/blog/Welcome)
<time datetime="2022-09-12">12 Sep, 2022</time> | 561 words | 2 minute read
</div>

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
