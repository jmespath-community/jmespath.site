interface CdnConfig {
	url: string;
	integrity: string;
	globalName: string;
	searchFn: string;
}

export interface VersionConfig {
	label: string;
	specRef: string;
	cdn: CdnConfig;
}

export type VersionSlug = "latest" | "2015-09-05-9e8d0e3";

export const versions: Record<VersionSlug, VersionConfig> = {
	latest: {
		label: "Latest (v1.1.4)",
		specRef: "HEAD",
		cdn: {
			url: "https://jmespath.blob.core.windows.net/lib/v1.1.4/jmespath.umd.min.js",
			integrity:
				"sha384-j6O40Ai4K7WYsLIPv7PVGVN4i8M+DP244ldsCxzfKQAUOuVR+S5ZR3mZr0z6OOGt",
			globalName: "jmespath",
			searchFn: "search",
		},
	},
	"2015-09-05-9e8d0e3": {
		label: "Legacy (2015-09-05)",
		specRef: "2015-09-05-9e8d0e3",
		cdn: {
			url: "https://jmespath.blob.core.windows.net/lib/v2015-09-05-9e8d0e3/jmespath.min.js",
			integrity:
				"sha384-Pb3pjju9BY7ahpWm+ev8GsRTP9tRwDSgIQwJoRhYjr9TY6aB+E7irR6Mc/ma6LcL",
			globalName: "jmespath",
			searchFn: "search",
		},
	},
};

export function getVersionSlugs(): VersionSlug[] {
	return Object.keys(versions) as VersionSlug[];
}

export function getDefaultVersion(): VersionSlug {
	return "latest";
}

export function getVersionConfig(slug: string): VersionConfig {
	if (!versions[slug as VersionSlug]) {
		throw new Error(`Unknown version slug: ${slug}`);
	}
	return versions[slug as VersionSlug];
}
