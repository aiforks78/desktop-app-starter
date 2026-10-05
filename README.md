# Desktop App Starter

A free desktop app starter built for **Claude Code**. Electron 41, React 19, TypeScript, Tailwind 4.

It already runs. Open the folder in Claude Code, ask for a screen in plain words, and Claude adds it
the way the rest of the app is built: it reads `CLAUDE.md`, reuses the pieces that are already here,
and writes a test. Claude doesn't have to rebuild the window, the bridge, the settings or the
components for every new app.

MIT licensed. Use it for anything.

## What is already here

- **A safe bridge.** Main, preload and UI are split. Every message between them is typed and checked with Zod.
- **Claude, ready to call.** `askClaude`, `streamClaude` and `askClaudeJson` (zod-validated JSON) in the main process. Your API key is encrypted by the OS and never reaches the UI.
- **Your files.** Native file and folder pickers, drag and drop, and a file service that only touches what the user chose.
- **Settings and secrets.** Typed settings that persist, secrets in Electron `safeStorage`.
- **21 components, 8 layout and 3 motion primitives.** Buttons, inputs, select, table, modal, confirm dialog, toasts, tabs, tooltips, and more. See them on the Components screen.
- **Motion.** The `motion` library plus `FadeIn`, `SlideIn`, `ScaleIn`.
- **Themes.** System, light, dark and three more.
- **Generators.** `npm run new:feature` and `npm run new:ipc` write the wiring in every place it goes.
- **CLAUDE.md.** The rules Claude Code reads first, so every feature lands in the same structure.
- **Installers.** Unsigned builds for Windows, macOS and Linux.
- **Checks.** TypeScript strict, ESLint, Vitest, a GitHub Actions CI file.

## Quickstart

Requires **Node.js 20.19+ or 22.12+**.

```bash
git clone https://github.com/hassancs91/desktop-app-starter.git my-app
cd my-app
npm install
npm run setup
npm run dev
```

Then open the **AI** screen and paste your Anthropic API key
([get one here](https://console.anthropic.com/settings/keys)). Calls are billed to your own key.

## Build your first feature

Open the folder in Claude Code and ask for what you want, for example:

> Add a screen where I pick a text file and see how many lines, words and characters it has.
> Follow the way the rest of this app is built, and write a test for the counting service.

Claude will add a folder under `src/features/`, one entry in `src/renderer/screens-registry.ts`,
any main-process service and IPC channel it needs, and a test. Then:

```bash
npm run typecheck && npm run lint && npm run test
```

## Rename it

```bash
npm run rebrand -- --name "Acme Notes" --id com.acme.notes
```

Replace `resources/icon.png` (1024×1024) with your icon.

## Ship it

```bash
npm run build:win     # Windows installer (.exe)
npm run build:mac     # macOS (.dmg, unsigned)
npm run build:linux   # AppImage + .deb
npm run build:unpack  # unpacked folder for a quick test
```

Installers land in `dist/`. They are unsigned: Windows SmartScreen and macOS Gatekeeper will ask the
user to confirm the first time.

## Commands

| Command               | What it does                                   |
| --------------------- | ---------------------------------------------- |
| `npm run dev`         | Start the app with hot reload                  |
| `npm run typecheck`   | TypeScript on main and renderer                |
| `npm run lint`        | ESLint                                         |
| `npm run test`        | Vitest unit tests                              |
| `npm run new:feature` | Scaffold a screen and register it              |
| `npm run new:ipc`     | Scaffold an IPC channel in all 5 places        |
| `npm run rebrand`     | Rename the app                                 |
| `npm run build:*`     | Build installers                               |

## What the full version adds

This is a cut of the **Desktop App Boilerplate**. The full one adds auto-update, code signing and
notarization, license keys with offline grace, a SQLite data layer, sign-in with OAuth, background
jobs with progress, a command palette, i18n, tray, deep links, diagnostics, telemetry, 45 components,
78 tests and a 950-line CLAUDE.md. If you only want to build tools for yourself, you don't need it.

## Docs

- [CLAUDE.md](./CLAUDE.md): architecture, patterns and rules (also the best human overview).
- [docs/components.md](./docs/components.md): every component and hook.
- [docs/design-tokens.md](./docs/design-tokens.md): colors, spacing, radius, motion tokens.

## License

MIT. See [LICENSE](./LICENSE).
