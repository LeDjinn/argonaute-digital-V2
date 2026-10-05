# Website operations

## Project and ownership

This is Timour Spiridonov's Argonaute Digital website, not the separate STUDIO.NEGRA portfolio.

- Repository: `Website_Argonaute_Digital/argonaute-aceternity` under `~/Documents/Argonaute Digital`.
- Personal GitHub repository: `LeDjinn/argonaute-digital-V2`, production branch `main`.
- Production domain: `https://www.argonaute-digital.com`.
- Deployment: Vercel GitHub integration. Verify successful deployment of the exact pushed commit, then inspect live endpoints.

### Mandatory personal GitHub boundary

Before ANY Git push, gh command, pull request or repository action:

1. Run `gh auth switch --user LeDjinn`.
2. Run `gh auth status` and verify LeDjinn is the active account.
3. If switching fails, stop and ask the owner (scheduled jobs abort and report).

Before EVERY commit and push:

1. Check `git remote -v`; all remotes must target `github.com/LeDjinn/...`.
2. Set repo-local identity: `git config --local user.name LeDjinn` and `git config --local user.email timour.spiridonov@gmail.com`.
3. Never use, push to, or create repositories under Community Jameel/CJ or Thought Industries/TI accounts or organizations. Any such remote is a hard stop.

Never commit credentials, .env files, private research evidence, dependency directories or generated build artifacts. Stage explicit paths; inspect the staged diff before committing. Never force-push.

## Architecture and design

Next.js 15.5.27 App Router, React 18, TypeScript and Tailwind CSS. Blog rendering uses @next/mdx with GitHub-flavored Markdown and syntax highlighting. Route params are promises and must be awaited. Explicit English/French prefixes are enabled; legacy unprefixed URLs remain supported.

- `app/[locale]/(marketing)`: homepage, contact, case studies, blog, pricing/workflow and offers.
- `app/messages/en.json` and `fr.json`: marketing translations and case-study data.
- `components`: shared interface and feature components.
- `lib`: blog discovery, SEO helpers and site configuration.
- `public`: images, logos and PDFs.
- `db` and `app/api/auth`: existing database/auth infrastructure, not a blog CMS.
- `design_handoff_website`: design references.

Use the existing design tokens: near-black base `#0a0a0b`, elevated `#0c0c0e`, cards `#111113`, indigo `#6366f1`, green `#6ee7a7`, Inter text and IBM Plex Mono labels. Keep restrained borders, rounded cards, spacious layouts and accessible focus states.

## Editorial rules

Publish original practical technical writing under Timour Spiridonov's name. Cover software engineering, technology careers/in-demand skills and new technologies, rotating angles instead of rewriting the same headline.

Every new published article must:

- Contain 600–900 body words excluding MDX imports/metadata and the Sources section.
- Have a unique stable slug, title, description, tags and real publication date.
- Cite factual claims using inline references and linked primary sources actually read during research.
- Clearly distinguish evidence from opinion and avoid unsupported predictions presented as fact.
- Avoid copied wording, fabricated statistics, quotes, personal experiences, results, testimonials and comments.
- Include relevant internal links to existing articles and an actionable contact call-to-action.
- Be written in English unless a real French translation has been authored; never label English text as a French translation.

Read a current article and `lib/blog.ts` before writing: the metadata/wrapper contract is executable code, not an assumed frontmatter format. Preserve existing template URLs but do not promote template content as original work. Templates must be clearly marked and excluded from public discovery/indexing.

Use the `argonaute-website-publishing` Hermes skill for source ledger, drafting and publishing procedure. Store source evidence outside the website repository. Validate citations and word counts programmatically.

### MDX contract

Each post directory contains `page.mdx` with imports from `@/components/blog-layout` and `@/lib/blog`, an exported literal `blog` object, exported `generateMetadata = (props) => generateBlogMetadata(blog, props)`, and a single-line default `BlogLayout` wrapper before the Markdown body.

Required metadata: exact directory `slug`, `title`, `description`, `author: { name: "Timour Spiridonov", src: "/tim.png" }`, `date` in YYYY-MM-DD, unique lower-kebab `tags`, `draft: false`, positive integer `readingTime`, and actual HTTPS `sources` URLs. Use Markdown reference definitions to make numbered citations clickable. Do not duplicate the article H1 in the body.

Run `PATH=/opt/homebrew/bin:$PATH npm test`, `npm run validate:blog`, and `npm run build`. `prebuild` also enforces content validation. For an actual running production server, run `BLOG_TEST_BASE_URL=http://localhost:<port> npm run test:smoke`. This checks both locales, articles, tags, drafts, metadata, feed, sitemap and old URLs; parse RSS/sitemap as XML as well.

## Publishing gates

On this Mac use `PATH=/opt/homebrew/bin:$PATH` for Node/npm. The older `/usr/local/bin/node` cannot build this project. Check the installed Node version first.

1. Acquire a per-run lock outside the repository. Abort on overlapping writers.
2. Verify the personal account/remote boundary, branch, working tree and remote main. Never overwrite uncommitted user work or divergent history.
3. Read published titles and dates; avoid duplicates and skip automated publishing when today's Africa/Tunis date already has an article.
4. Research, draft and validate. Run the repository's content-validation/test commands and production build; fix errors without disabling quality checks.
5. Review the full diff and stage explicit files. Commit each coherent step with a clear conventional message and personal Git identity.
6. Run the production build before EVERY push, and again after any later code/content changes. Never push a broken build.
7. Push a fast-forward main using LeDjinn only.
8. Read back the remote SHA, Vercel deployment status for that exact SHA, and live blog/article/tag/feed/sitemap responses. Check canonical and OpenGraph metadata. A push alone is not successful publication.
9. Save a report containing source URLs, word counts, tests/build results, commit SHA, deployment status and live URLs.

## Dependency security

The rollout upgrades Next to 15.5.27 and NextAuth to 4.24.15, updates Drizzle and other vulnerable dependencies, and pins patched PostCSS/PrismJS versions in both package-manager configurations.

Blog discovery uses Node filesystem APIs, not runtime glob parsing. Tailwind plugins are build-only development dependencies. The production-only npm audit reports zero findings after this change. The full audit still reports seven high dependency findings derived from one unpatched `braces` advisory (GHSA-vfj7-8cjw-p6xm) in the Tailwind/ESLint build-tool chain. This is not a claim that the entire dependency tree is vulnerability-free. Never expose attacker-controlled glob patterns to build tooling; recheck the primary advisory and full audit during maintenance. Do not apply blanket forced upgrades or suppress audit output.

## Engagement

Use related posts, tags, contextual internal links, clear contact CTAs and accessible sharing controls. Offer RSS rather than collecting emails without a working consent-based backend. Never fabricate subscribers, traffic, comments or social proof.

Judge engagement by real returning readers, useful contact enquiries and source-attributed visits over time. Distribution and analytics are follow-up work, not outcomes to invent after shipping a blog.

## Weekday automation

Hermes job: `9f48e3d83e87` (Argonaute weekday original article).
Schedule: `0 10 * * 1-5` in configured `Africa/Tunis` timezone.
Workflow skill: `argonaute-website-publishing`.
Delivery: local saved run reports; no live CLI notification is promised.

The launchd Hermes gateway serves the schedule and starts at login. This is local automation: the Mac must be awake and online, credentials/model access must remain available, and missed schedules may be caught up late. Check `hermes cron status` and `hermes cron list` rather than assuming jobs are running. The job stays paused until the initial rollout is verified, then is resumed.

If research, validation, authentication, build or deployment fails, do not claim publication. Report the blocker and saved artifacts. Routine article runs must not change the framework or dependencies without a separately reviewed maintenance step.
