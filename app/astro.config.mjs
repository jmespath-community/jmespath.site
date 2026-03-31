import { defineConfig } from "astro/config";
import remarkJmespath from "./src/plugins/remark-jmespath.mjs";
import mdx from "@astrojs/mdx";

export default defineConfig({
	integrations: [mdx()],
	output: "static",
	site: "https://jmespath.site",
	markdown: {
		remarkPlugins: [remarkJmespath],
	},
});
