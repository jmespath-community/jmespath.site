/**
 * Parses search expressions in three formats:
 *
 * Full format:        search(jmespath-expression, json-input) -> json-result
 * Assignment format:  identifier = search(jmespath-expression, json-input) -> json-result
 * Simple format:      jmespath-expression -> json-result
 *
 * Strategy: Parse backwards from the known boundaries.
 * - We know the result (after " -> ")
 * - For full/assignment format: extract input (JSON/string), find separator comma, extract expression
 * - For simple format: extract expression directly
 */

export interface SearchExpressionResult {
	expr: string;
	input: string | null;
	result: string;
	identifier?: string; // Assignment identifier, if present (e.g., "result" or "left_evaluation")
}

/**
 * Parse a search expression (full, assignment, or simple format).
 *
 * Full:       search(EXPRESSION, INPUT) -> RESULT
 * Assignment: IDENTIFIER = search(EXPRESSION, INPUT) -> RESULT
 * Simple:     EXPRESSION -> RESULT
 *
 * Returns null if not a valid search expression.
 */
export function parseSearchExpression(
	fullLine: string,
): SearchExpressionResult | null {
	// Find the arrow separator
	const arrowIdx = fullLine.indexOf(" -> ");
	if (arrowIdx === -1) return null;

	const result = fullLine.substring(arrowIdx + 4).trim();

	// Check if this is a full search(...) or simple expression
	let beforeArrow = fullLine.substring(0, arrowIdx).trim();
	let identifier: string | undefined;

	// Handle assignment format: identifier = search(...)
	// Find the search( position first, then look for = before it
	const searchIdx = beforeArrow.indexOf("search(");
	if (searchIdx > 0 && beforeArrow.includes("=")) {
		const beforeSearch = beforeArrow.substring(0, searchIdx);
		const lastEqIdx = beforeSearch.lastIndexOf("=");
		if (lastEqIdx !== -1) {
			// Extract the assignment identifier
			identifier = beforeSearch.substring(0, lastEqIdx).trim();
			// Remove the assignment part (identifier = )
			beforeArrow = beforeArrow.substring(lastEqIdx + 1).trim();
		}
	}

	if (beforeArrow.includes("search(")) {
		// Full format: search(expr, input) -> result
		const parsed = parseFullFormat(beforeArrow, result);
		if (parsed && identifier) {
			parsed.identifier = identifier;
		}
		return parsed;
	}
	// Simple format: expr -> result
	const parsed = parseSimpleFormat(beforeArrow, result);
	if (parsed && identifier) {
		parsed.identifier = identifier;
	}
	return parsed;
}

/**
 * Parse full format: search(EXPRESSION, INPUT) -> RESULT
 */
function parseFullFormat(
	beforeArrow: string,
	result: string,
): SearchExpressionResult | null {
	if (!beforeArrow.endsWith(")")) return null;

	const searchStart = beforeArrow.indexOf("search(");
	if (searchStart === -1) return null;

	const searchEnd = beforeArrow.length - 1; // Position of )

	// Extract input by working backwards from the closing paren
	const inputResult = extractJsonInputBackwards(
		beforeArrow,
		searchStart,
		searchEnd,
	);
	if (!inputResult) return null;

	const { inputStart, inputEnd } = inputResult;
	const input = beforeArrow.substring(inputStart, inputEnd).trim();

	// The separator comma should be right before the input (after trimming spaces)
	let commaPos = inputStart - 1;
	while (commaPos >= 0 && /\s/.test(beforeArrow[commaPos])) {
		commaPos--;
	}

	if (commaPos < 0 || beforeArrow[commaPos] !== ",") {
		return null;
	}

	const expr = beforeArrow.substring(searchStart + 7, commaPos).trim();

	return { expr, input, result };
}

/**
 * Parse simple format: EXPRESSION -> RESULT (no input)
 */
function parseSimpleFormat(
	expr: string,
	result: string,
): SearchExpressionResult | null {
	if (!expr || expr.length === 0) return null;

	return { expr, input: null, result };
}

/**
 * Extract JSON input by working backwards from the closing paren.
 * Returns the start and end positions of the input.
 *
 * The input can be:
 * - A JSON object: {...}
 * - A JSON array: [...]
 * - A JSON string: "..."
 * - A JSON number: 123, -4.5
 * - A JSON keyword: true, false, null
 */
function extractJsonInputBackwards(
	line: string,
	searchStart: number,
	searchEnd: number,
): { inputStart: number; inputEnd: number } | null {
	// Start from the closing paren and work backwards
	let pos = searchEnd - 1;

	// Skip whitespace before the closing paren
	while (pos > searchStart && /\s/.test(line[pos])) {
		pos--;
	}

	if (pos <= searchStart) return null;

	const endChar = line[pos];
	let startPos = pos;

	// Case 1: Ends with } - it's a JSON object
	if (endChar === "}") {
		startPos = findMatchingBrace(line, pos, "{", "}");
		if (startPos === -1) return null;
		// inputEnd is exclusive (one past the last char)
		return { inputStart: startPos, inputEnd: pos + 1 };
	}

	// Case 2: Ends with ] - it's a JSON array
	if (endChar === "]") {
		startPos = findMatchingBrace(line, pos, "[", "]");
		if (startPos === -1) return null;
		return { inputStart: startPos, inputEnd: pos + 1 };
	}

	// Case 3: Ends with " - it's a string (JSON or plain)
	if (endChar === '"') {
		startPos = findMatchingQuote(line, pos, '"');
		if (startPos === -1) return null;
		return { inputStart: startPos, inputEnd: pos + 1 };
	}

	// Case 4: A number or keyword (true, false, null)
	// Work backwards to find the start
	pos--;
	while (pos >= searchStart && /[0-9a-zA-Z._\-+]/.test(line[pos])) {
		pos--;
	}
	startPos = pos + 1;

	return { inputStart: startPos, inputEnd: searchEnd };
}

/**
 * Find the opening bracket/brace that matches the one at endPos.
 * Works backwards with proper nesting, handling strings with escapes.
 */
function findMatchingBrace(
	line: string,
	endPos: number,
	openChar: string,
	closeChar: string,
): number {
	let pos = endPos;
	let depth = 1;
	let inString = false;
	let stringChar = "";

	pos--;

	while (pos >= 0 && depth > 0) {
		const char = line[pos];

		// Handle string delimiters
		if (inString) {
			if (char === stringChar) {
				// Check if this quote is escaped
				let backslashCount = 0;
				let checkPos = pos - 1;
				while (checkPos >= 0 && line[checkPos] === "\\") {
					backslashCount++;
					checkPos--;
				}
				// If even number of backslashes, the quote is not escaped
				if (backslashCount % 2 === 0) {
					inString = false;
				}
			}
			pos--;
			continue;
		}

		if (char === '"' || char === "'" || char === "`") {
			inString = true;
			stringChar = char;
			pos--;
			continue;
		}

		// Track bracket depth only when not in string
		if (char === closeChar) {
			depth++;
		} else if (char === openChar) {
			depth--;
			if (depth === 0) {
				return pos;
			}
		}

		pos--;
	}

	return -1;
}

/**
 * Find the opening quote that matches the one at endPos.
 * Works backwards, handling escapes correctly.
 *
 * Key: A quote is only escaped if there's an ODD number of backslashes before it.
 */
function findMatchingQuote(
	line: string,
	endPos: number,
	quoteChar: string,
): number {
	let pos = endPos - 1;

	while (pos >= 0) {
		const char = line[pos];

		if (char === quoteChar) {
			// Count preceding backslashes
			let backslashCount = 0;
			let checkPos = pos - 1;
			while (checkPos >= 0 && line[checkPos] === "\\") {
				backslashCount++;
				checkPos--;
			}

			// If even number of backslashes (including 0), the quote is not escaped
			if (backslashCount % 2 === 0) {
				return pos;
			}
		}

		pos--;
	}

	return -1;
}
