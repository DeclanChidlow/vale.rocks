import { isUnpackable, Tree } from "@weborigami/async-tree";

/**
 * Return the metadata for a tag, throwing if the tag doesn't exist.
 *
 * @param {import("@weborigami/async-tree").Treelike} tagData
 * @param {string} slug
 */
export default async function tagInfo(tagData, slug) {
	if (isUnpackable(tagData)) {
		tagData = await tagData.unpack();
	}

	const info = await Tree.traverse(tagData, slug);
	if (info === undefined) {
		throw new Error(`Tag "${slug}" has no entry in src/tag_data.yaml.`);
	}
	return info;
}
