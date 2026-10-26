# WebsiteTest

A dependency-free browser color-contrast workbench. Choose two colors and preview text with a calculated sRGB contrast ratio.

## Run

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. The page runs entirely locally; there is no account or backend.

## Test

```sh
node --test tests/*.test.mjs
```

Color choices are saved in this browser. **Reset colors** clears that saved choice. The workbench also works when browser storage is blocked.

The thresholds describe color contrast only, not whole-page accessibility conformance.

## What the workbench checks

Black text on white measures `21:1`; identical colors measure `1:1`. Threshold labels use the full calculated ratio, not the rounded display number. The test suite covers these reference cases, threshold boundaries, invalid colors, and optional browser-storage behavior.

## Developer resources

- [Feature usage and API contracts](docs/RECENT_IMPROVEMENTS.md)
- [Troubleshooting and recovery](docs/TROUBLESHOOTING.md)
- [Contributor checks and change review](docs/CONTRIBUTOR_CHECKLIST.md)
