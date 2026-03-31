# Product Requirements Document: GitHub Workflows & README Update

**Project**: Migrate CI/CD from Hugo-based to Astro-based build system
**Status**: In Planning
**Last Updated**: 2026-03-31

---

## Summary of User Stories

- [x] **US-001**: Update build workflow for Astro/Starlight (Model: `claude-sonnet-4.6`)
- [x] **US-002**: Create GitHub Pages deployment workflow using Option B (Model: `claude-sonnet-4.6`)
- [ ] **US-003**: Create comprehensive README documentation (Model: `gpt-5-mini`)
- [ ] **US-004**: Archive or clean up old Hugo-specific scripts (Model: `claude-haiku-4.5`)

---

## User Stories

### US-001: Update Build Workflow for Astro/Starlight

**Description**:
As a developer, I want the CI/CD build workflow to validate code quality for the Astro/Starlight site, so that PRs and commits are checked for formatting, linting, and type safety before integration.

**Current State**:

- `.github/workflows/build.yaml` still uses Hugo build process
- `build.sh` script downloads and runs JP service for Hugo
- No integration with modern tooling (pnpm, biome, astro check)

**Implementation Details**:

The updated `build.yaml` workflow should:

1. **Trigger Conditions**:
   - On `push` to `main` branch
   - On `pull_request` to any branch (for validation)
   - Manual `workflow_dispatch` (optional)

2. **Checkout & Setup**:
   - Use `actions/checkout@v4` to fetch repository
   - Use `pnpm/action-setup` to install pnpm
   - Use `actions/setup-node` with cache (`pnpm` type) for faster builds
   - Install dependencies: `pnpm -C app/ install`
   - Download [`jp`](https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64) to `app/` folder for build.

3. **Quality Checks** (must all pass):
   - **Format Check**: `pnpm -C app/ run format` (verify code is formatted correctly)
   - **Lint Check**: `pnpm -C app/ run lint` (biome lint checks)
   - **Type Check**: `pnpm -C app/ run check` (astro check for TypeScript/Astro validation)
   - **Build**: `pnpm -C app/ run build` (test that production build succeeds)

4. **Error Handling**:
   - All commands must use default failure behavior (stop on non-zero exit)
   - No `continue-on-error` flags
   - Provide clear step names with emoji markers (consistent with existing style)

5. **Optional: Upload Artifacts**:
   - Consider uploading `app/dist/` as build artifact for debugging or inspection

**Hints & Gotchas**:

- pnpm requires `-C app/` flag because app is a subdirectory in the workspace
- `pnpm -C app/ run format` is a dry-run check; use `format:write` to fix
- Biome may stop reporting errors after emitting too many diagnostics; multiple runs may be needed locally
- Node.js version should match `package.json` engines field if specified
- Cache key should include `pnpm-lock.yaml` hash for proper invalidation

**Acceptance Criteria**:

- [x] Workflow file created at `.github/workflows/build.yaml`
- [x] Runs on push to main and all pull requests
- [x] Successfully installs dependencies with pnpm
- [x] Executes format check (reports misalignment without modification)
- [x] Executes lint check (reports biome violations)
- [x] Executes astro check (reports TypeScript/Astro issues)
- [x] Executes astro build (confirms production build works)
- [x] Workflow fails if any quality check fails
- [x] Workflow passes when all checks succeed
- [x] Workflow names and descriptions use emoji markers

**Definition of Done**:

- Build workflow tested on a feature branch (PR created)
- Workflow successfully validates both passing and failing scenarios
- Format, lint, and check commands produce clear, actionable output
- Documentation updated to reference the workflow

---

### US-002: Create GitHub Pages Deployment Workflow

**Description**:
As a maintainer, I want the site to automatically build and deploy to GitHub Pages on successful main branch builds, so that the production site is kept in sync with the codebase.

**Current State**:

- `gh-pages.yaml` does not exist (never converted from Hugo workflow)
- `gh-pages.sh` is Hugo-specific (incompatible with Astro)
- `gh-pages` branch exists with critical `CNAME` file (`jmespath.site`) that must be preserved
- Manual pushes or old workflow references non-existent files

**Implementation Details**:

The new `gh-pages.yaml` workflow should:

1. **Trigger Conditions**:
   - On successful completion of build workflow (`workflow_run` event, filter for `build.yaml` completion)
   - OR on successful push to `main` branch (simpler alternative: include deployment in build.yaml)
   - Manual `workflow_dispatch` for emergency deployments
   - Only trigger on main branch pushes (not on PRs or other branches)

2. **Checkout & Setup**:
   - Fetch full repository with history: `actions/checkout@v4` with `fetch-depth: 0`
   - Setup pnpm and Node.js (same as build workflow)
   - Install dependencies: `pnpm -C app/ install`
   - Download [`jp`](https://github.com/jmespath-community/jp/releases/download/v1.1.0/jp-linux-amd64) to `app/` folder for build.

3. **Build Site**:
   - Run: `pnpm -C app/ run build`
   - Generates static files to `app/dist/` directory

4. **Deploy to gh-pages**:
   - **Option A** (Recommended): Use `peaceiris/actions-gh-pages@v4`
     - Input: `github_token: ${{ secrets.GITHUB_TOKEN }}`
     - Input: `publish_dir: ./app/dist/`
     - Input: `cname: jmespath.site` (recreates CNAME in deployed branch)
     - Preserves CNAME and repo history automatically

   - **Option B** (Manual git operations):
     - Fetch `gh-pages` branch into temp directory
     - Copy `app/dist/` contents to temp directory
     - Preserve `CNAME` file from existing gh-pages content
     - Commit and push gh-pages branch with descriptive message
     - Use `Springcomp` as committer (consistent with existing style)

5. **Verification**:
   - Workflow logs show successful deployment
   - CNAME file preserved in gh-pages branch
   - Site accessible at jmespath.site

**Hints & Gotchas**:

- CNAME file is critical for DNS resolution; losing it breaks the domain
- `peaceiris/actions-gh-pages` handles CNAME preservation if you provide `cname` input
- Full history fetch (`fetch-depth: 0`) not strictly necessary but useful for analysis
- GitHub token permissions: default GITHUB_TOKEN sufficient for pushing to pages
- Consider adding status check / deployment protection rules
- Ensure `app/dist/` is correctly generated before deployment
- The `workflow_run` trigger only works for workflows in the same repository

**Acceptance Criteria**:

- [x] Workflow file created at `.github/workflows/gh-pages.yaml`
- [x] Triggers only on successful main branch commits (or build workflow completion)
- [x] Successfully builds Astro site with `pnpm -C app/ run build`
- [x] Deploys built artifacts (`app/dist/`) to `gh-pages` branch
- [x] CNAME file is preserved during deployment (contains `jmespath.site`)
- [ ] Site remains accessible at the custom domain after deployment
- [x] Deployment includes descriptive commit message
- [x] Workflow fails gracefully if build fails
- [x] Manual `workflow_dispatch` works for emergency deployments

**Definition of Done**:

- Workflow tested with a push to main (observe deployment)
- Verify gh-pages branch contains correct built files
- Verify CNAME file exists and contains `jmespath.site`
- Verify site is accessible at <https://jmespath.site>
- Document deployment process in README

---

### US-003: Create Comprehensive README Documentation

**Description**:
As a new contributor or user, I want a clear README that explains how to build and serve the JMESPath site locally, so that I can understand the project and set up a development environment quickly.

**Current State**:

- No README.md in repository root
- Project context only available through indirect discovery or issue templates
- No local development instructions for Astro/Starlight site

**Implementation Details**:

The README.md should include the following sections:

1. **Project Overview** (1-2 paragraphs)
   - Brief description: "JMESPath language documentation website built with Astro and Starlight"
   - Link to JMESPath specification and community resources
   - Note about migration from Hugo to Astro/Starlight

2. **Prerequisites**
   - Node.js (specify minimum version, e.g., 18.x or 20.x)
   - pnpm (specify version or "latest")
   - Optional: Git knowledge for contributions

3. **Quick Start**
   - Clone repository: `git clone https://github.com/jmespath-community/jmespath.site.git`
   - Navigate to app: `cd app/`
   - Install dependencies: `pnpm install`
   - Start dev server: `pnpm run dev`
   - Access site at <http://localhost:3000> (or whatever Astro's default port is)

4. **Development Commands**
   - `pnpm run dev` — Start local development server with hot-reload
   - `pnpm run build` — Build static site for production
   - `pnpm run preview` — Preview production build locally
   - `pnpm run format` — Check code formatting (dry-run)
   - `pnpm run format:write` — Auto-fix formatting issues
   - `pnpm run lint` — Check code for linting violations
   - `pnpm run lint:fix` — Auto-fix linting issues
   - `pnpm run check` — Type-check with Astro (TypeScript validation)
   - `pnpm run test` — Run tests (if test suite exists)

5. **Project Structure** (brief overview)
   - `app/` — Astro/Starlight project root
   - `app/src/` — Source files (pages, components, data)
   - `app/public/` — Static assets
   - `.github/workflows/` — CI/CD workflows

6. **Deployment**
   - Explain that commits to `main` automatically trigger:
     - Build validation (format, lint, type check)
     - Deployment to gh-pages branch
     - Site update at jmespath.site
   - Mention manual triggers via `workflow_dispatch` if available

7. **Contributing**
   - Link to contribution guidelines (if they exist)
   - Note about PR checks and code quality requirements
   - Encouragement to test locally before pushing
   - Example workflow: create branch → make changes → run `pnpm format:write && pnpm lint:fix && pnpm check` → commit → push

8. **Troubleshooting** (common issues)
   - "pnpm: command not found" → Install pnpm globally
   - "Port 3000 already in use" → Astro auto-selects next available port
   - "Build fails with TypeScript error" → Run `pnpm check` to diagnose
   - Dependencies not found → Run `pnpm install` again

9. **License**
   - Reference LICENSE file

**Hints & Gotchas**:

- README should reflect actual commands and ports (verify with `astro.config.mjs`)
- pnpm docs recommend installing globally with `npm install -g pnpm@latest`
- Development experience is significantly improved with hot-reload; emphasize `pnpm run dev`
- Formatter and linter are required in CI; mention running them before commit
- Some users may be unfamiliar with pnpm; a brief explanation helps
- Keep technical depth moderate — target both newcomers and experienced developers

**Acceptance Criteria**:

- [ ] README.md exists at repository root
- [ ] Contains clear project overview and purpose
- [ ] Lists Node.js and pnpm prerequisites
- [ ] Includes quick-start section with clone and setup steps
- [ ] Documents all major pnpm scripts with brief descriptions
- [ ] Explains development workflow and best practices
- [ ] Includes project structure overview
- [ ] Explains automatic CI/CD and deployment process
- [ ] Provides troubleshooting section for common issues
- [ ] Uses clear formatting (headings, code blocks, lists)
- [ ] Free of broken links and outdated information
- [ ] Tested by following instructions from scratch (on different machine if possible)

**Definition of Done**:

- README created and reviewed for accuracy
- Instructions verified by successfully running all commands
- README included in git and visible on GitHub
- Links to LICENSE and other resources verified

---

### US-004: Archive or Clean Up Old Hugo-Specific Scripts

**Description**:
As a maintainer, I want to remove or archive obsolete Hugo-specific build scripts, so that the repository remains clean and contributors are not confused by dead code.

**Current State**:

- `build.sh` exists (used by old build.yaml, Hugo-specific)
- `gh-pages.sh` exists (used by old gh-pages.yaml, Hugo-specific)
- Both scripts reference Hugo, ncat, and JP service
- Old workflows may still reference these scripts

**Implementation Details**:

1. **Decide on Approach**:
   - **Full Delete**: If no historical value needed, delete `build.sh` and `gh-pages.sh`
   - **Archive**: Create `.archive/` directory and move scripts there with README explaining legacy use
   - **Deprecation Branch**: Create `legacy-hugo` branch with old setup for historical reference

   *Recommendation*: Archive in `.github/archive/` with a README explaining they are legacy Hugo builds.

2. **Archive Process**:
   - Create `.github/archive/` directory
   - Move `build.sh` and `gh-pages.sh` to `.github/archive/`
   - Create `.github/archive/README.md` explaining these are legacy Hugo scripts
   - Verify no other files reference these scripts
   - Commit with message: "Archive legacy Hugo build scripts"

3. **Verification**:
   - Search codebase for references to old scripts:
     - `grep -r "build.sh"` (should find only in archive)
     - `grep -r "gh-pages.sh"` (should find only in archive)
     - Check `.github/workflows/` has no references
   - Confirm active workflows do not depend on archived scripts

**Hints & Gotchas**:

- Before deleting, verify nothing in active workflows references these files
- Git history will preserve old files even if deleted
- Some teams prefer archival for audit trails
- Update any documentation that mentions these scripts
- Consider adding CI check to prevent re-introduction (grep in workflows)

**Acceptance Criteria**:

- [ ] Old scripts moved to `.github/archive/` or deleted
- [ ] Archive README created explaining legacy status
- [ ] No active workflows reference old scripts
- [ ] Grep search confirms no dangling references
- [ ] Git log shows clean commit with descriptive message
- [ ] Decision documented (why delete vs. archive)

**Definition of Done**:

- Cleanup committed and pushed
- Old scripts no longer in main `.github/workflows/` directory
- Verification tests pass (no dangling references)

---

## Implementation Timeline & Dependencies

**Dependency Graph**:

```
US-001 (Build Workflow)
  ├── US-002 (Deployment Workflow)  [depends on US-001]
  ├── US-003 (README)              [no dependencies, can be parallel]
  └── US-004 (Cleanup)             [depends on US-001]
```

**Suggested Execution Order**:

1. **US-001** (Build Workflow) — Core requirement for CI validation
2. **US-003** (README) — Can run in parallel, valuable for all users
3. **US-002** (Deployment Workflow) — Build on top of proven US-001
4. **US-004** (Cleanup) — Final cleanup after new workflows verified

---

## Success Metrics

- ✅ All PRs run through quality checks (format, lint, check, build)
- ✅ Commits to main automatically deploy to jmespath.site
- ✅ New contributors can build and serve locally in <5 minutes
- ✅ CNAME preserved and domain remains accessible
- ✅ Codebase clean of deprecated Hugo references
- ✅ Zero manual deployment steps required

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| CNAME lost during deployment | Domain becomes inaccessible | Use `peaceiris/actions-gh-pages` with `cname` input, test before merging |
| Build times exceed limits | CI timeout or resource issues | Cache pnpm dependencies, monitor build duration |
| Workflow errors unclear to contributors | Merge PRs with style issues | Clear error messages, include troubleshooting in README |
| Old scripts accidentally re-introduced | Confusion, technical debt | Archive clearly, grep check in CI, document deprecation |
