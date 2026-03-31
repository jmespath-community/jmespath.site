/**
 * Highlights a JMESPath expression with basic syntax coloring.
 *
 * Currently implements simple single-color highlighting.
 * This function can be replaced with a full JMESPath syntax highlighter
 * that colors different token types distinctly.
 *
 * @param expression - A trimmed JMESPath expression string
 * @returns HTML string with the expression wrapped in a colored span
 *
 * @example
 * highlightJMESPath("foo.bar[0].baz")
 * // Returns: '<span style="color: #00d4ff;">foo.bar[0].baz</span>'
 */
export function highlightJMESPath(expression: string): string {
	// HTML escape the expression to prevent injection
	const escaped = escapeHtml(expression);

	// TODO: Full JMESPath syntax highlighter can be plugged in here
	// Currently: simple single-color highlighting
	// Future enhancement could color:
	// - Identifiers (fields, variables)
	// - Operators (., |, [], @, etc.)
	// - String literals (quoted strings)
	// - Number literals
	// - Keywords (true, false, null)
	// - Functions (map, select, contains, sort_by, etc.)

	return `<span style="color: #00d4ff;">${escaped}</span>`;
}

/**
 * Escapes HTML special characters to prevent injection attacks
 * @internal
 */
function escapeHtml(text: string): string {
	const map: { [key: string]: string } = {
		"&": "&amp;",
		"<": "&lt;",
		">": "&gt;",
		'"': "&quot;",
		"'": "&#39;",
	};
	return text.replace(/[&<>"']/g, (char) => map[char]);
}
