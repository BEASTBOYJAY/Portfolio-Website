# Portfolio

Personal portfolio site for Jay Sinha (AI Engineer). Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4. Static single-page site, no backend.

## Dev

```bash
npm run dev      # dev server (Turbopack) at localhost:3000
npm run build    # production build
npm run start    # serve production build
npm run lint     # eslint
```

## Structure

Almost entire site lives in `src/app/page.tsx`. Content (nav, projects, experience, skills) defined as data arrays at top of file — edit those to change content.
