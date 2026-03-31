import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function verifyFunctionsCollection() {
	const functions: CollectionEntry<"functions">[] =
		await getCollection("functions");

	// Verify we have both versions
	const latest = functions.filter((f) => f.data.version === "latest");
	const legacy = functions.filter(
		(f) => f.data.version === "2015-09-05-9e8d0e3",
	);

	return functions.length > 0 && latest.length > 0 && legacy.length > 0;
}
