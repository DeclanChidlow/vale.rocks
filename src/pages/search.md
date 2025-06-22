---
title: Search
description: A search page allowing for querying the content of Vale.Rocks and performing full, complex, and rich searches of the content. Allows searching through the full managed index of almost my entire web output.
og_description: Full site search of Vale.Rocks.
stylesheet: "pages/search.css"
canonical: /search
---

<h1 class="section">Search</h1>

<div class="readable">

<script src="/pagefind/pagefind-ui.js"></script>
<div id="search"></div>

<noscript>
<p>For full search functionality JavaScript is required. This is a fallback that will perform a site search using DuckDuckGo.</p>

<form class="no-js-search" role="search" action="https://duckduckgo.com" method="GET">
  <label for="search-for">Search with DuckDuckGo:</label>
  <input id="search-for" type="search" name="q" required>
  <input type="hidden" name="sites" value="vale.rocks">
  <button type="submit">Search</button>
</form>
</noscript>

<script src="/assets/scripts/search.js"></script>

</div>
