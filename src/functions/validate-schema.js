import validator from "@weborigami/json-schema";

const DATE_RX = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export default async function validateSchema(schema) {
	return validator(schema, {
		formats: {
			date: DATE_RX,
		},
	});
}
