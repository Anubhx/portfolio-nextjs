# Patch: app/api/audit/route.ts

Find where you currently map axe violations into AuditIssue objects.
It will look something like one of these:

```ts
// Pattern A — direct mapping
const issues = axeResults.violations.flatMap(v =>
  v.nodes.map(n => ({
    severity: v.impact,
    message: v.description,   // ← THIS is the raw string causing the bug
    element: n.target[0],
    value: undefined,
  }))
)

// Pattern B — a helper function you wrote
const issues = mapAxeViolations(axeResults.violations)
```

## The fix — two lines

At the top of route.ts, add the import:
```ts
import { cleanAxeViolations } from "@/lib/cleanAxeIssue"
```

Then replace however you're mapping violations with:
```ts
const issues = cleanAxeViolations(axeResults.violations)
```

That's it. `cleanAxeViolations` handles:
- Stripping "Fix all of the following:" from every message
- Using axe's `help` field (always clean) instead of `description`
- Extracting the contrast ratio from failureSummary e.g. "2.1:1"
- Flagging alt text issues with value "missing"
- Mapping axe impact levels to our severity tiers
- Capping at 100 issues so KV storage stays reasonable
- Mapping axe rule IDs to our categories (contrast/altText/typography/spacing)

## Verify it worked

After the fix, one issue object should look like:
```json
{
  "severity": "critical",
  "category": "contrast",
  "message": "Elements must have sufficient color contrast",
  "element": ".footer-links > a:hover",
  "value": "2.1:1"
}
```

NOT like this (the broken version):
```json
{
  "severity": "critical",
  "message": "Fix all of the following:\n  Element has insufficient color contrast of 2.10:1...",
  "element": "a[target='_blank'][href='http...']",
  "value": undefined
}
```
