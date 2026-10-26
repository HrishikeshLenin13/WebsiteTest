# Troubleshooting WebsiteTest

Use the smallest reproducible fixture before changing production data or configuration. Run commands from the repository root.

## A shared URL uses the wrong pair

Check that both fg and bg contain valid encoded hex colors. A malformed fragment is ignored; try the Share pair button instead of hand-editing it.

## A ratio looks close to a threshold

Threshold checks use the full ratio; the displayed rounded number is not the pass/fail input.

## A reset does not survive another tab

Preferences belong to the browser origin. Compare in the same origin and reload after reset; this is not account synchronization.

## Reproduce and report

1. Record the exact command or UI action, runtime version, expected result, and actual result.
2. Run the regression command below on the same checkout and keep its first failure, not only the final summary.
3. Reduce the issue to a deterministic fixture without personal data or credentials.
4. Include the affected source path from the [feature guide](RECENT_IMPROVEMENTS.md) and whether it reproduces on a clean checkout.

```sh
node --test tests/*.test.mjs
```

## Recovery

Keep a copy of input data before experimenting. Revert the individual source change with Git and rerun the same fixture; a source revert does not automatically reverse browser storage, downloaded files, or external service state. Do not delete a lockfile or weaken a validation gate to make a failure disappear.
