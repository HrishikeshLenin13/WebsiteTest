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

The thresholds describe color contrast only, not whole-page accessibility conformance.
