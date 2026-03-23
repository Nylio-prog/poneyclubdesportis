# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 app using the App Router and TypeScript.

- `app/`: Route segments and page/layout files (localized routes under `app/[locale]/...`).
- `components/`: Shared UI components (`components/ui/` for lower-level primitives, `components/mobile/` for mobile nav).
- `lib/`: Utilities, metadata helpers, hooks, and i18n config.
- `data/`: Structured content used by pages (events, animals).
- `messages/`: Translation dictionaries (`en.json`, `fr.json`).
- `e2e/`: Playwright end-to-end tests.
- `public/`: Static assets (images, PDFs, logos).
- `docs/`: Developer/testing documentation.

## Build, Test, and Development Commands
- `npm install`: Install dependencies (Node `24.x` required).
- `npm run dev`: Start local dev server at `http://localhost:3000`.
- `npm run build`: Production build.
- `npm run start`: Run built app.
- `npm run lint`: Run Next.js lint checks.
- `npm run analyze`: Build with bundle analyzer enabled.
- `npm run test:e2e`: Run Playwright tests with auto-managed web server.
- `npm run test:e2e:no-server`: Run tests against an already running dev server.
- `npm run test:e2e:ui` / `npm run test:e2e:headed`: Debug tests interactively.

## Coding Style & Naming Conventions
- Use TypeScript (`.ts`/`.tsx`) with strict typing (`tsconfig.json` has `"strict": true`).
- Follow existing formatting: 2-space indentation, semicolons, single quotes in TS/TSX.
- Prefer path alias imports like `@/components/...` over deep relative paths.
- Component files use PascalCase (example: `CertificationBar.tsx`).
- Keep route folder names lowercase and hyphenated where applicable.

## Testing Guidelines
- Framework: Playwright (`@playwright/test`) with specs in `e2e/*.spec.ts`.
- Name specs by feature (example: `language-switching.spec.ts`).
- Before PRs, run `npm run test:e2e:no-server` with `npm run dev` in a separate terminal.
- Review failures with `npm run test:e2e:report`.

## Commit & Pull Request Guidelines
- Prefer Conventional Commit prefixes seen in history: `feat:`, `fix:`, `docs:`, `chore:`.
- Keep commit scope focused and messages imperative (example: `fix: resolve mobile nav selector mismatch`).
- PRs should include a clear user-facing summary, linked issue/task (if any), test evidence (commands + results), and screenshots/video for UI work (desktop and mobile when relevant).
