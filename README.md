JMESPath Site
=================

Project overview
----------------
JMESPath language documentation website built with Astro and Starlight. This repository contains the site source (app/) and GitHub Actions workflows to validate and deploy the site. The project migrated from Hugo to Astro; CI now runs format, lint, type checks, and builds before deployment to GitHub Pages at jmespath.site.

Prerequisites
-------------
- Node.js v18+ (recommend 20.x)
- pnpm (latest) — install with: `npm install -g pnpm@latest`
- Git (familiarity recommended)

Quick start
-----------
1. Clone the repo:

   git clone https://github.com/jmespath-community/jmespath.site.git
2. Enter the project app folder:

   cd app/
3. Install dependencies:

   pnpm install
4. Start dev server:

   pnpm run dev

5. Open the site at http://localhost:3000 (Astro default)

Development commands
--------------------
- pnpm run dev — Start dev server with hot reload
- pnpm run build — Build static site (outputs to app/dist/)
- pnpm run preview — Preview production build locally
- pnpm run format — Check formatting (dry-run)
- pnpm run format:write — Fix formatting
- pnpm run lint — Run biome/linters
- pnpm run lint:fix — Try to auto-fix lint issues
- pnpm run check — Run Astro/TypeScript checks
- pnpm run test — Run tests (if present)

Project structure
-----------------
- app/ — Astro/Starlight project root
  - app/src/ — Pages, components, and data
  - app/public/ — Static assets
  - app/dist/ — Production build output (generated)
- .github/workflows/ — CI/CD workflows (build, gh-pages)
- .agentic/ — agent artifacts and PRD

Deployment
----------
Commits to main trigger the build workflow that runs format, lint, checks, and build. Successful main builds then deploy to the gh-pages branch and publish to jmespath.site. Manual triggers (workflow_dispatch) are available for emergencies.

Contributing
------------
1. Create a branch for your changes
2. Run formatting and lint checks locally:

   pnpm run format:write && pnpm run lint:fix && pnpm run check
3. Commit and push; open a PR. CI will validate format, lint, and type checks before merging.

Troubleshooting
---------------
- "pnpm: command not found" — install pnpm globally: `npm install -g pnpm@latest`
- "Port 3000 already in use" — Astro will usually pick the next free port; check the terminal or specify PORT env var
- "Build fails with TypeScript error" — run `pnpm run check` to inspect errors
- Dependencies missing — run `pnpm install` from app/

License
-------
See the LICENSE file in the repository root for license details.
