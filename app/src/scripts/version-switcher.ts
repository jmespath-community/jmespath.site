/**
 * version-switcher.ts
 *
 * Handles JMESPath version selection:
 * - Persists user preference in localStorage.
 * - On shared pages: swaps the CDN <script> and re-evaluates demos.
 * - On versioned pages: navigates to the equivalent URL for the chosen version.
 */

interface VersionCdnConfig {
	url: string;
	integrity: string;
}

interface VersionsConfig {
	[slug: string]: VersionCdnConfig;
}

interface JMESPathLib {
	search: (data: unknown, expression: string) => unknown;
}

type WindowWithJMESPath = Window & { jmespath?: JMESPathLib };

const STORAGE_KEY = "jmespath-version";
const DEFAULT_VERSION = "latest";
const CDN_SCRIPT_ID = "jmespath-cdn-script";
const LOADED_EVENT = "jmespath-loaded";

/** Read embedded versions config from the JSON data island. */
function readVersionsConfig(): VersionsConfig {
	const el = document.getElementById("jmespath-versions-config");
	if (!el) return {};
	try {
		return JSON.parse(el.textContent ?? "{}") as VersionsConfig;
	} catch {
		return {};
	}
}

/** Extract the version slug from a versioned URL path segment (2nd segment). */
function versionFromPath(pathname: string): string | null {
	const m = pathname.match(/^\/(specification|functions)\/([^/]+)\//);
	return m ? m[2] : null;
}

/** Remove any existing CDN script tag (identified by CDN_SCRIPT_ID). */
function removeExistingCdnScript(): void {
	document.getElementById(CDN_SCRIPT_ID)?.remove();
	// Also clear any previous global so demos wait for the new one.
	const w = window as WindowWithJMESPath;
	w.jmespath = undefined;
}

/** Load the CDN script for the given version config, then dispatch jmespath-loaded. */
function loadCdnScript(cfg: VersionCdnConfig): void {
	removeExistingCdnScript();

	const script = document.createElement("script");
	script.id = CDN_SCRIPT_ID;
	script.src = cfg.url;
	script.integrity = cfg.integrity;
	script.crossOrigin = "anonymous";

	script.addEventListener("load", () => {
		window.dispatchEvent(new CustomEvent(LOADED_EVENT));
	});

	script.addEventListener("error", () => {
		showCdnError(cfg.url);
	});

	document.head.appendChild(script);
}

/** Show a non-intrusive CDN load error banner. */
function showCdnError(url: string): void {
	const existing = document.getElementById("jmespath-cdn-error");
	if (existing) return;

	const banner = document.createElement("div");
	banner.id = "jmespath-cdn-error";
	banner.setAttribute("role", "alert");
	banner.style.cssText =
		"position:fixed;bottom:1rem;right:1rem;padding:0.75rem 1rem;background:#fff5f5;" +
		"border:1px solid #e53e3e;border-radius:6px;color:#c53030;font-size:0.875rem;" +
		"z-index:9999;max-width:320px;box-shadow:0 2px 8px rgba(0,0,0,0.15);";
	banner.textContent = `Failed to load JMESPath library from CDN. Demos may not work. (${url})`;

	const close = document.createElement("button");
	close.textContent = "×";
	close.setAttribute("aria-label", "Dismiss");
	close.style.cssText =
		"margin-left:0.75rem;background:none;border:none;cursor:pointer;font-size:1rem;color:inherit;";
	close.addEventListener("click", () => banner.remove());
	banner.appendChild(close);

	document.body.appendChild(banner);
}

/** Re-evaluate all visible demos by dispatching jmespath-loaded. */
function reEvaluateDemos(): void {
	window.dispatchEvent(new CustomEvent(LOADED_EVENT));
}

function init(): void {
	const select = document.getElementById(
		"version-select",
	) as HTMLSelectElement | null;
	if (!select) return;

	const pageType = select.dataset.pageType as "shared" | "versioned";
	const config = readVersionsConfig();

	// ── Determine the active version ─────────────────────────────────────────
	let activeVersion: string;

	if (pageType === "versioned") {
		// For versioned pages, the version comes from the URL path.
		const pathVersion = versionFromPath(window.location.pathname);
		activeVersion = pathVersion ?? DEFAULT_VERSION;
		// Sync localStorage so shared pages pick up this preference.
		localStorage.setItem(STORAGE_KEY, activeVersion);
	} else {
		// For shared pages, use localStorage preference.
		activeVersion = localStorage.getItem(STORAGE_KEY) ?? DEFAULT_VERSION;
	}

	// ── Sync the selector UI ─────────────────────────────────────────────────
	for (const opt of Array.from(select.options)) {
		opt.selected = opt.value === activeVersion;
	}

	// ── Load CDN for shared pages ─────────────────────────────────────────────
	if (pageType === "shared") {
		const cdnCfg = config[activeVersion];
		if (cdnCfg) {
			loadCdnScript(cdnCfg);
		}
	}

	// ── Version change handler ────────────────────────────────────────────────
	select.addEventListener("change", () => {
		const newVersion = select.value;
		localStorage.setItem(STORAGE_KEY, newVersion);

		if (pageType === "versioned") {
			// Navigate to the equivalent URL for the new version.
			const path = window.location.pathname;
			const newPath = path.replace(
				/\/(specification|functions)\/[^/]+\//,
				`/$1/${newVersion}/`,
			);
			if (newPath !== path) {
				window.location.href = newPath;
			}
		} else {
			// Shared page: swap CDN script.
			const cdnCfg = config[newVersion];
			if (cdnCfg) {
				loadCdnScript(cdnCfg);
				// Demos will re-evaluate on the jmespath-loaded event dispatched by loadCdnScript.
			} else {
				// Unknown version config — just re-evaluate with whatever is loaded.
				reEvaluateDemos();
			}
		}
	});
}

// Run after DOM is ready.
if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
