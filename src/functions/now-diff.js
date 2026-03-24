import { Tree } from "@weborigami/async-tree";

const isListKey = (k) => !["pub_time", "date_raw", "overall"].includes(k) && !k.startsWith("diff_");

export default async (tree) =>
	Object.fromEntries(
		Object.entries(await Tree.plain(tree))
			.sort(([a], [b]) => a.localeCompare(b))
			.reduce(
				([acc, state], [key, data]) => [
					[
						[
							key,
							{
								...data,
								diff_added: Object.entries(data)
									.filter(([k, v]) => v && isListKey(k) && v !== state[k])
									.map(([, value]) => ({ value })),
								diff_removed: Object.entries(data)
									.filter(([k, v]) => !v && isListKey(k) && state[k])
									.map(([k]) => ({ value: state[k] })),
							},
						],
						...acc,
					],
					{ ...state, ...data },
				],
				[[], {}],
			)[0],
	);
