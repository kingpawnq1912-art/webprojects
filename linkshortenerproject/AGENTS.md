<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# shortly Agent Instructions

This is a Next.js 16 link-shortening application named `shortly`. These instructions apply to all work in this repository.

## Critical Documentation Requirement

**It is incredibly important to ALWAYS read every relevant individual instruction file in the `/docs` directory BEFORE generating ANY code.** Before writing, modifying, or proposing code, identify which `/docs/*.md` files apply to the task and read each one in full. Do not generate any code until this documentation review is complete. When a task spans multiple concerns, read all corresponding instruction files, not just the first relevant file.

- Authentication and route protection: [docs/authentication.md](docs/authentication.md)
- UI components: [docs/ui-components.md](docs/ui-components.md)


## Non-Negotiables

- Preserve the generated Next.js instructions above.
- Keep secrets out of source control and never expose server-only environment variables to the client.
- Keep database access and authentication decisions on the server, and authorize every user-owned operation.
- Use the existing project stack and conventions before introducing new dependencies or abstractions.
- Make focused changes, preserve unrelated worktree changes, and validate with the narrowest useful check followed by `npm run lint`.
