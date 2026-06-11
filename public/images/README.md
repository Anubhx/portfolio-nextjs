# /public/images/ — Drop your images here

This folder is the single place to put all images for the portfolio.
Reference them from `constants.ts` using the path `/images/filename.jpg`

## What to put here

| File name (suggested) | Used for |
|---|---|
| `hero.jpg` | Your profile/hero photo |
| `uem_logo.png` | UEM college logo |
| `school1.png` | High school logo |
| `school2.png` | Secondary school logo |
| `ltimindtree.png` | LTIMindtree company logo |
| `vedantu.png` | Vedantu company logo |
| `ecstasia.png` | Ecstasia company logo |
| `project-companylens.png` | CompanyLens project screenshot |
| `project-lexai.png` | LexAI project screenshot |
| `project-flowwise.png` | FlowWise project screenshot |
| `project-languagetalk.png` | LanguageTalk project screenshot |
| `project-ats.png` | Smart ATS Analyzer screenshot |
| `project-airbnb.png` | AirBnB Clone screenshot |
| `project-employee.png` | EmployeePro screenshot |
| `project-virtustore.png` | VirtuStore screenshot |
| `og.png` | Optional static OG image fallback |

## How to reference in constants.ts

```ts
// Local image (from this folder):
image: "/images/project-companylens.png"

// External hosted image (GitHub raw, Behance, etc.):
image: "https://github.com/Anubhx/project/raw/main/screenshot.png"

// No image yet (shows gradient placeholder):
image: null
```

Next.js serves everything in `/public/` at the root URL automatically.
