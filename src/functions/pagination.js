/**
 * Render pagination controls for a `Tree.paginate` page.
 *
 * @param {object} paginated
 * @param {string} base
 * @param {object} [options]
 * @param {string} [options.pageOneHref] Where page 1 lives, if not the base URL.
 * @param {string} [options.previousFallbackHref] Link to use when there is no previous page.
 * @param {string} [options.previousFallbackLabel] Label for the previous fallback link.
 */
export default function pagination(paginated, base, options = {}) {
	const pageHref = (page) => (page === 1 ? (options.pageOneHref ?? base) : `${base}/${page}`);
	const previousHref = paginated.previousPage ? pageHref(paginated.previousPage) : options.previousFallbackHref;
	const previousLabel = paginated.previousPage ? "Newer" : (options.previousFallbackLabel ?? "Newer");
	const nextHref = paginated.nextPage ? pageHref(paginated.nextPage) : undefined;

	return `
		<div class="pagination" data-pagefind-ignore>
			${previousHref ? `<a href="${previousHref}" rel="prev"><span aria-hidden="true">←</span> ${previousLabel}</a>` : "<span></span>"}
			<p>Page ${paginated.pageNumber} of ${paginated.pageCount}</p>
			${nextHref ? `<a href="${nextHref}" rel="next">Older <span aria-hidden="true">→</span></a>` : "<span></span>"}
		</div>
	`;
}
