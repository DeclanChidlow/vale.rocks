---
title: Search
description: An index of all my syndication feeds in various formats, including RSS, JSON Feed, and Atom, that users can subscribe to for easy subscription and updates.
---

<link rel="stylesheet" href="/assets/styles/pages/search.css">

<h1 id="section" data-pagefind-filter="Content Type:Page">Search</h1>

<div class="readable-width">

<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>

<noscript>Searching Vale.Rocks requires JavaScript. You might consider doing a site search in a search engine.</noscript>

<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({
            element: "#search",
            pageSize: 10,
            showSubResults: true,
            showImages: false,
            excerptLength: 30,
            resetStyles: false,
            autofocus: true 
        });
    });
</script>


</div>
