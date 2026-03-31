import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import { visit } from "unist-util-visit";

/**
 * Escape HTML special characters
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
function htmlEscape(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * Remark plugin to process JMESPath code blocks
 * @typedef {Object} JmespathOptions
 * @property {string} [jpBin="./jp"] - Path to jp binary
 *
 * @param {JmespathOptions} options - Plugin options
 * @returns {Function} Transformer function
 */
export default function remarkJmespath(options = {}) {
	const jpBinOption = options.jpBin ?? "./jp";

	// Resolve jp binary: try both .exe and no extension on Windows
	let resolvedJp = null;
	if (existsSync(jpBinOption)) {
		resolvedJp = jpBinOption;
	} else if (existsSync(`${jpBinOption}.exe`)) {
		resolvedJp = `${jpBinOption}.exe`;
	}

	if (!resolvedJp) {
		console.warn(
			`[remark-jmespath] jp binary not found at: ${jpBinOption} or ${jpBinOption}.exe`,
		);
	}

	/**
	 * @param {Object} tree - AST tree from unified
	 */
	return async function transformer(tree) {
		const nodes = [];

		visit(tree, "code", (node, index, parent) => {
			if (node.lang === "jmespath") {
				nodes.push({ node, index, parent });
			}
		});

		for (const { node, index, parent } of nodes) {
			const lines = node.value.split("\n");
			const expression = lines[0].trim();
			const jsonData = lines.slice(1).join("\n").trim();

			let result;
			if (!resolvedJp) {
				result = "(jp binary not found)";
			} else {
				try {
					// Use double quotes for Windows compatibility, escape any existing quotes
					const escapedExpr = expression.replace(/"/g, '\\"');
					result = execSync(`"${resolvedJp}" -u "${escapedExpr}"`, {
						input: jsonData,
						encoding: "utf8",
						shell: true,
					}).trim();
				} catch (err) {
					result = err instanceof Error ? err.message : String(err);
				}
			}

			const html = `<div class="jmespath-demo">
  <input class="query" value="${htmlEscape(expression)}" readonly />
  <textarea class="data" readonly>${htmlEscape(jsonData)}</textarea>
  <textarea class="result" readonly>${htmlEscape(result)}</textarea>
</div>`;

			parent.children[index] = {
				type: "html",
				value: html,
			};
		}
	};
}
