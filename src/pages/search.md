---
title: Search
description: An index of all my syndication feeds in various formats, including RSS, JSON Feed, and Atom, that users can subscribe to for easy subscription and updates.
stylesheet: "pages/search.css"
---

<h1 id="section" data-pagefind-filter="Content Type:Page">Search</h1>

<div class="readable-width">

<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>

<noscript>
<p>For full search functionality JavaScript is required. This is a fallback that will perform a site search using Google.</p>

<form class="no-js-search" role="search" action="https://google.com/search" method="GET">
  <label for="search-for">Search with Google:</label>
  <input id="search-for" type="search" name="q" required>
  <input type="hidden" name="q" value="site:vale.rocks">
  <button type="submit">Search</button>
</form>
</noscript>

<script>
    window.addEventListener('DOMContentLoaded', (event) => {
        new PagefindUI({
            element: "#search",
            pageSize: 10,
            showSubResults: true,
            showImages: false,
            excerptLength: 30,
            resetStyles: false,
            autofocus: true,
            highlightParam: "hl"
        });
    });
</script>

</div>
