(The file `/workspaces/srinivasa_kondragunta_portfolio/readme.md` exists, but contains only whitespace)
# srinivasa_kondragunta_portfolio

This repository contains a Vite + React portfolio site located in `portfolio-app/`.

## 🚀 Live Site

**Portfolio URL:** https://cloudshare360.github.io/srinivasa_kondragunta_portfolio/

## Quick build & run

```bash
# from repo root
cd portfolio-app
npm install
npm run dev      # start dev server at http://localhost:5173/srinivasa_kondragunta_portfolio/
npm run build    # production build
npm run preview  # preview built site
```

## Deployment

**Automatic deployment:**
- Push to `main` branch triggers GitHub Actions
- Site deploys automatically to GitHub Pages

**Manual deployment:**
```bash
cd portfolio-app
npm run deploy
```

## Testing & Validation

**Quick deployment check:**
```bash
./scripts/quick_check.sh
```

**Comprehensive integration tests:**
```bash
./scripts/integration_test.sh
```

## Troubleshooting

**404 Errors:**
- Ensure GitHub Pages is enabled in repository settings
- Verify GitHub Actions workflow completed successfully
- Check that base path is set to `/srinivasa_kondragunta_portfolio/` in vite.config.ts
- 404.html file handles client-side routing for React Router

**Build Issues:**
```bash
cd portfolio-app
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Development Server:**
- Dev server runs at: http://localhost:5173/srinivasa_kondragunta_portfolio/
- Note the base path in the URL for proper routing

Auto-commit helper

There's an optional helper script at `scripts/auto_commit.sh` which can be used to create periodic commits of any local changes. Use with caution and configure `INTERVAL_SECONDS` as needed.

Meta files

Placeholder agent/meta files live under `.meta/`. These are templates for agent memory, MCP, RAG and conversation logs.

See `requirements.md` for more detailed project requirements and build notes.

