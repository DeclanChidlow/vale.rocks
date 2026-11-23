/**
 * Escape a value for safe interpolation into HTML text or a double-quoted attribute.
 *
 * @param {unknown} value
 * @returns {string}
 */
export default function escapeHtml(value) {
	return String(value ?? "")
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}
