# Overview

The [jmespath.site](https://jmepath.site) source code.

## Prerequisites

- Node.js v18+ (recommend 22.x)
- pnpm (latest) — install with: `npm install -g pnpm@latest`
- Git (familiarity recommended)

## Quick start

Clone the repo, and install dependencies:

```sh
git clone https://github.com/jmespath-community/jmespath.site.git

pnpm -C app/ install
```

Install required [`jp`](https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64) binary to pre-compute live examples:

```sh
curl -sSL https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64 -o app/jp
chmod +x app/jp
```

Build and run the local server:

```sh
pnpm -C app/ build
pnpm -C app run dev
```

1. Open the site at <http://localhost:3000> (Astro default)

## Development commands

- `pnpm run dev` — Start dev server with hot reload
- `pnpm run build` — Build static site (outputs to app/dist/)
- `pnpm run preview` — Preview production build locally
- `pnpm run format` — Check formatting (dry-run)
- `pnpm run format`:write — Fix formatting
- `pnpm run lint` — Run biome/linters
- `pnpm run lint:fix` — Try to auto-fix lint issues
- `pnpm run check` — Run Astro/TypeScript checks
- `pnpm run test` — Run tests (if present)

## Contributing

1. Create a branch for your changes
2. Run formatting and lint checks locally:

```sh
pnpm run format:write && pnpm run lint:fix && pnpm run check
```

1. Commit and push; open a PR. CI will validate format, lint, and type checks before merging.

## Troubleshooting

- "pnpm: command not found" — install pnpm globally: `npm install -g pnpm@latest`
- "Port 3000 already in use" — Astro will usually pick the next free port; check the terminal or specify PORT env var
- "Build fails with TypeScript error" — run `pnpm run check` to inspect errors
- Dependencies missing — run `pnpm install` from app/
