// Shared HTML escape utility
const escapeMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	'"': "&quot;",
	"'": "&#39;",
} as const;

export function escapeHtml(text: string): string {
	return text.replace(
		/[&<>"']/g,
		(char) => escapeMap[char as keyof typeof escapeMap],
	);
}
