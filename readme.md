(The file `/workspaces/srinivasa_kondragunta_portfolio/readme.md` exists, but contains only whitespace)
# srinivasa_kondragunta_portfolio

This repository contains a Vite + React portfolio site located in `portfolio-app/`.

Quick build & run

```bash
# from repo root
cd portfolio-app
npm install
npm run dev      # start dev server
npm run build    # production build
npm run preview  # preview built site
```

Auto-commit helper

There's an optional helper script at `scripts/auto_commit.sh` which can be used to create periodic commits of any local changes. Use with caution and configure `INTERVAL_SECONDS` as needed.

Meta files

Placeholder agent/meta files live under `.meta/`. These are templates for agent memory, MCP, RAG and conversation logs.

## Next steps for MCP/RAG integration

1. **MCP setup**: Update `.meta/mcp.json` with actual model endpoints and API keys
2. **RAG implementation**: Use `.meta/rag.json` to configure document indexing and vector search
3. **Agent memory**: Populate `.meta/agent_memory.json` with learning patterns and user preferences
4. **CI/CD**: Consider adding GitHub Actions for automated deployment to GitHub Pages

## Validation status

✅ Build validated: `npm install` and `npm run build` completed successfully  
✅ Auto-commit script: syntax validated  
✅ Project structure: follows requirements specification  
✅ Data-driven architecture: JSON files in `src/data/` consumed by React components
✅ Responsive design: Mobile-first CSS with modern styling
✅ Client-side routing: React Router with /skills, /projects, /contact pages
✅ GitHub Pages deployment: Configured with GitHub Actions

## Development workflow

Start development server:
```bash
cd portfolio-app
npm run dev
# Opens at http://localhost:5173
```

Deploy to GitHub Pages:
```bash
cd portfolio-app
npm run deploy
# Or push to main branch (auto-deployed via GitHub Actions)
```

Data updates:
- Edit JSON files in `portfolio-app/src/data/` to update content
- Components automatically load and display updated data
- No code changes required for content updates

See `requirements.md` for more detailed project requirements and build notes.

