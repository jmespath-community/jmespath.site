/**
 * Highlights JSON with Catppuccin color scheme
 * Returns HTML string with inline styles for syntax highlighting
 */

import { escapeHtml } from "./escape";

export function highlightJSON(jsonString: string): string {
	// Catppuccin Mocha color palette
	const colors = {
		key: "#89b4fa", // blue - for object keys
		string: "#a6e3a1", // green - for string values
		number: "#f5c2de", // pink - for numbers
		boolean: "#f5c2de", // pink - for true/false
		null: "#f5c2de", // pink - for null
		punctuation: "#6c7086", // gray - for brackets, braces, colons, commas
	};

	// Helper to wrap text in a span with inline style
	const span = (text: string, color: string): string => {
		return `<span style="color: ${color};">${text}</span>`;
	};

	try {
		// Validate JSON by parsing it
		JSON.parse(jsonString);

		// Define token interface
		interface Token {
			type:
				| "string"
				| "colon"
				| "literal"
				| "number"
				| "punctuation"
				| "whitespace";
			value: string;
			isKey?: boolean;
		}

		// Tokenize using regex
		// Matches: strings, colons, literals (true/false/null), numbers, punctuation, whitespace
		const tokens: Token[] = [];
		const tokenRegex =
			/("(?:\\.|[^"\\])*")|(:)|(true|false|null)|(-?\d+\.?\d*(?:[eE][+-]?\d+)?)|([{}\[\],])|(\s+)/g;

		let match: RegExpExecArray | null = tokenRegex.exec(jsonString);
		while (match !== null) {
			const fullMatch = match[0];

			if (match[1]) {
				// String literal
				tokens.push({ type: "string", value: fullMatch });
			} else if (match[2]) {
				// Colon
				tokens.push({ type: "colon", value: fullMatch });
			} else if (match[3]) {
				// Boolean or null literal
				tokens.push({ type: "literal", value: fullMatch });
			} else if (match[4]) {
				// Number
				tokens.push({ type: "number", value: fullMatch });
			} else if (match[5]) {
				// Punctuation (brackets, braces, comma)
				tokens.push({ type: "punctuation", value: fullMatch });
			} else if (match[6]) {
				// Whitespace
				tokens.push({ type: "whitespace", value: fullMatch });
			}
			match = tokenRegex.exec(jsonString);
		}

		// Mark keys: a string followed by a colon is a key
		// (look ahead past whitespace to find the colon)
		for (let i = 0; i < tokens.length; i++) {
			if (tokens[i].type === "string") {
				// Look ahead for a colon, skipping whitespace
				let j = i + 1;
				while (j < tokens.length && tokens[j].type === "whitespace") {
					j++;
				}
				if (j < tokens.length && tokens[j].type === "colon") {
					tokens[i].isKey = true;
				}
			}
		}

		// Generate HTML with syntax highlighting
		let result = "";
		for (const token of tokens) {
			const escaped = escapeHtml(token.value);

			switch (token.type) {
				case "string": {
					// Use key color if this string is an object key, otherwise use string color
					const stringColor = token.isKey ? colors.key : colors.string;
					result += span(escaped, stringColor);
					break;
				}

				case "colon":
					result += span(escaped, colors.punctuation);
					break;

				case "literal":
					// true, false, or null
					result += span(escaped, colors.boolean);
					break;

				case "number":
					result += span(escaped, colors.number);
					break;

				case "punctuation":
					// Brackets, braces, commas
					result += span(escaped, colors.punctuation);
					break;

				case "whitespace":
					// Preserve whitespace as-is (already escaped)
					result += escaped;
					break;
			}
		}

		return result;
	} catch (error) {
		// Invalid JSON - return escaped string as-is
		// This gracefully handles malformed JSON by displaying it without highlighting
		return escapeHtml(jsonString);
	}
}
