---
title: Search
description: A search page allowing for querying the content of Vale.Rocks and performing full, complex, and rich searches of the content. Allows searching through the full managed index of almost my entire web output.
og_description: Full site search of Vale.Rocks.
stylesheet: "pages/search.css"
canonical: /search
---

<h1 class="section" data-pagefind-ignore>Search</h1>

<div class="readable" data-pagefind-ignore>

<link href="/pagefind/pagefind-component-ui.css" rel="stylesheet">
<script src="/pagefind/pagefind-component-ui.js" type="module"></script>

<pagefind-config preload faceted></pagefind-config>
<pagefind-input></pagefind-input>

<div class="search-results">
	<div>
		<pagefind-filter-pane></pagefind-filter-pane>
	</div>
	<div>
    <pagefind-summary></pagefind-summary>
		<pagefind-results>
			<script type="text/pagefind-template">
				<li>
					<div class="result">
							<p><a href="{{ meta.url | default(url) | replace(".html", "")}}">{{ meta.title | replace("| Vale.Rocks", "") }}</a></p>
							{{#if excerpt}}
							<p>{{+ excerpt +}}</p>
							{{/if}}
					</div>
					{{#if sub_results}}
					<ul>
						{{#each sub_results as sub}}
						<li>
							<p><a href="{{ sub.url | default(url) | replace(".html", "")}}">{{ sub.title }}</a></p>
							<p>{{+ sub.excerpt +}}</p>
						</li>
						{{/each}}
					</ul>
					{{/if}}
				</li>
			</script>
			<script type="text/pagefind-template" data-template="placeholder">
				<li class="pf-result" aria-hidden="true">
					<div class="pf-result-card">
						<div class="pf-result-content">
							<p class="pf-result-title pf-skeleton pf-skeleton-title"></p>
							<p class="pf-result-excerpt pf-skeleton pf-skeleton-excerpt"></p>
						</div>
					</div>
				</li>
			</script>
		</pagefind-results>
	</div>
</div>

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
