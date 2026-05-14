import { Tree } from "@weborigami/async-tree";

const metaKeys = new Set(["pub_time", "date_raw", "overall"]);
const isEmpty = (value) => value == null || (typeof value === "string" && value.trim() === "");

export default async (nows) => {
	const tree = await Tree.plain(nows);

	const merged = Object.keys(tree)
		.sort()
		.reduce((acc, dateKey) => {
			for (const [k, value] of Object.entries(tree[dateKey] ?? {})) {
				if (!k.startsWith("diff_")) acc[k] = value;
			}
			return acc;
		}, {});

	const result = { meta: {}, activities: {} };
	for (const [key, value] of Object.entries(merged)) {
		if (metaKeys.has(key)) {
			result.meta[key] = value;
		} else if (!isEmpty(value)) {
			result.activities[key] = value;
		}
	}

	return result;
};
