# Formyard release verification

Checked 2026-11-10 in Chromium through an HTTP server bound to localhost. No app files were opened through file://.

## Completed

- `npm run check`: JavaScript syntax checks and all 15 Node tests passed.
- `npm run build`: passed. The static output excludes development test pages.
- `/tests/browser.html`: **22 passed, 0 failed**, observed in the actual browser. Covers CRUD, renaming, numeric transforms, invalid-scale clamping, visibility, solid/wire mode, history, project imports, cancellation, new scene and export preparation.
- Autosave smoke test outside test mode: Added a sixth object, reloaded, and verified the object remained in the collection.
- Desktop and 390px iframe layouts inspected. Controls remain available below the viewport on narrow screens. Fresh browser captures are saved in `docs/screenshots/desktop.png` and `narrow.png`. Narrow capture is the 390px app iframe, not a physical-device test.

## Verification limits

The browser harness invokes real app handlers, substitutes synthetic test files, and intercepts generated download links to inspect their data. It does not certify the operating system file chooser or delivery of downloads. A separate real-download attempt timed out in browser tooling, so native download completion is not claimed. Pointer gestures, physical-touch input, pressure devices, other browsers and assistive technologies have not received exhaustive manual testing.

Unit tests cover geometry, validation, history and OBJ serialization; they supplement rather than replace browser checks. Product capability limits are documented in the README.
