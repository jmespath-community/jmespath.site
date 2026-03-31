// ─── Types ────────────────────────────────────────────────────────────────────

export type DocBlock = { type: "doc"; markdown: string };
export type RuleBlock = {
	type: "rule";
	lines: string[];
	sectionHeader: string;
};
export type JsonBlock = {
	type: "json";
	lines: string[];
};
export type JMESPathBlock = {
	type: "jmespath";
	lines: string[];
};
export type CodeBlock = {
	type: "code";
	lines: string[];
};
export type Block =
	| DocBlock
	| RuleBlock
	| JsonBlock
	| JMESPathBlock
	| CodeBlock;

export interface TocEntry {
	text: string;
	anchor: string;
	level: number; // 1 = #, 2 = ##, 3 = ###
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function slugify(text: string): string {
	return `spec-${text
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "")}`;
}

// ─── Markdown Grammar Parser (hardened) ───────────────────────────────────────

export function parseMarkdownGrammar(content: string): {
	blocks: Block[];
	toc: TocEntry[];
} {
	// Strip Unicode BOM if present and normalize newlines for Windows CRLF
	const normalized = content.replace(/^\uFEFF/, "");
	const lines = normalized.split(/\r?\n/);
	const blocks: Block[] = [];
	const toc: TocEntry[] = [];

	let docLines: string[] = [];
	let inCodeBlock = false;
	let codeBlockLines: string[] = [];
	let codeBlockLang = "";

	function flushDoc() {
		if (docLines.length === 0) return;
		// Normalize: trim trailing continuation backslashes from all doc lines before emitting
		const cleaned = docLines.map((l) => l.replace(/\\\s*$/, ""));
		blocks.push({ type: "doc", markdown: cleaned.join("\n") });
		docLines = [];
	}

	function flushCodeBlock() {
		if (codeBlockLines.length === 0) return;

		if (codeBlockLang === "abnf") {
			// ABNF code block becomes a rule block
			blocks.push({
				type: "rule",
				lines: [...codeBlockLines],
				sectionHeader: "",
			});
		} else if (codeBlockLang === "json") {
			// JSON code block
			blocks.push({
				type: "json",
				lines: [...codeBlockLines],
			});
		} else if (codeBlockLang === "jmespath") {
			// JMESPath code block
			blocks.push({
				type: "jmespath",
				lines: [...codeBlockLines],
			});
		} else if (codeBlockLang === "code") {
			// Generic code block (search expressions, etc)
			blocks.push({
				type: "code",
				lines: [...codeBlockLines],
			});
		} else {
			// Other code blocks go into doc blocks (preserve fencing)
			const codeText = [
				`\`\`\`${codeBlockLang}`,
				...codeBlockLines,
				"```",
			].join("\n");
			docLines.push(codeText);
		}

		codeBlockLines = [];
		codeBlockLang = "";
	}

	// Helper to process a chunk of text when not in code block: trim trailing backslashes and detect headings
	function processDocChunk(chunk: string) {
		// Remove trailing continuation backslashes used in the source
		const cleaned = chunk.replace(/\\\s*$/, "");
		const headingMatch = /^(#{1,3})\s+(.+)$/.exec(cleaned);
		if (headingMatch) {
			const level = headingMatch[1].length;
			const text = headingMatch[2].trim().replace(/\\\s*$/, "");
			const anchor = slugify(text);
			// Add to TOC and to docLines (preserve cleaned heading)
			toc.push({ text, anchor, level });
			docLines.push(headingMatch[0].replace(/\\\s*$/, ""));
		} else {
			// Regular prose line (may be empty)
			docLines.push(cleaned);
		}
	}

	for (const origLine of lines) {
		let rest = origLine;

		// Process any number of fence tokens that may appear in the same line (run-ins)
		while (true) {
			const idx = rest.indexOf("```");
			if (idx === -1) break;

			const pre = rest.slice(0, idx);
			const after = rest.slice(idx);

			if (!inCodeBlock) {
				// Opening fence found mid-line or at line start
				// Determine language (if any)
				const m = /^```(\w*)/.exec(after);
				const lang = m ? m[1] : "";
				// Flush any doc content before the fence
				if (pre.length > 0) {
					processDocChunk(pre);
				}
				flushDoc();
				inCodeBlock = true;
				codeBlockLang = lang;
				// Advance rest beyond the opening fence and its language token
				rest = after.slice(m ? m[0].length : 3);
				// continue looping to handle further fences in remainder
				continue;
			}

			// Closing fence found mid-line
			// pre should be part of the code block content
			codeBlockLines.push(pre);
			// Close the code block
			flushCodeBlock();
			inCodeBlock = false;
			// Advance rest after the closing fence (3 backticks)
			rest = after.slice(3);
			// continue looping to handle remainder (loop will naturally continue)
		}

		// No more fences on this line. Handle remaining 'rest'.
		if (inCodeBlock) {
			// Entire remainder belongs to code block (could be empty)
			codeBlockLines.push(rest);
		} else {
			// Not in code block: process as doc/prose (trim trailing backslashes)
			processDocChunk(rest);
		}
	}

	// Flush any remaining open structures
	if (inCodeBlock) {
		flushCodeBlock();
	}
	flushDoc();

	return { blocks, toc };
}
