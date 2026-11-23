import { isUnpackable, Tree } from "@weborigami/async-tree";

/**
 * Map all paginated pages after the first to HTML to avoid duplicating the root page.
 *
 * @param {import("@weborigami/async-tree").Treelike} paginated
 * @param {Function} template
 */
export default async function paginatedPages(paginated, template) {
	const source = await paginated;
	if (isUnpackable(template)) {
		template = await template.unpack();
	}
	const pages = await Tree.filter(source, (page) => page.pageNumber > 1);
	return Tree.mapExtension(pages, "→.html", { value: template });
}
