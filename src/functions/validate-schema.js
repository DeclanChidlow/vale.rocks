import { Tree } from "@weborigami/async-tree";
import validator from "@weborigami/json-schema";

const DATE_RX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export default async function validateSchema(schemaTreelike) {
	const schema = await Tree.plain(schemaTreelike);
	const expectsArray = schema?.type === "array";
	const validate = await validator(schemaTreelike, {
		formats: {
			date: DATE_RX,
		},
	});

	return async (input, key) => {
		input = await input;

		// Array-root schemas need a sequence of values, but tree inputs are maplike. Extract their values before validating.
		const data = expectsArray && !Array.isArray(input) ? await Tree.values(input) : input;

		return validate(data, key);
	};
}
