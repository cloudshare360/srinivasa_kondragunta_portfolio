Certainly! Below is a systematically reformatted and organized version of your request, grouped under clear sections with a dedicated **Requirements** section as requested.

---

# Portfolio Website Project Specification

## Overview  
Develop a responsive, multi-page personal portfolio website using **React 18**, driven by **structured JSON data** stored in a dedicated `data/` folder. The site will be published via **GitHub Pages**.

---

## Requirements

### 1. **Resume Conversion**
- Accept a user-provided resume (e.g., in PDF, DOCX, or plain text).
- Convert the resume content into structured **JSON format**.
- This JSON will serve as the foundational data source for the portfolio site.

### 2. **Data Architecture**
- Create a `data/` folder at the root of the project.
- Organize content using the following structure:
  ```
  data/
  ├── about/
  │   └── about-me.json
  ├── skills/
  │   └── skills.json
  ├── projects/
  │   ├── project-1.json
  │   ├── project-2.json
  │   └── ...
  ├── contact/
  │   └── contact-info.json
  └── (other pages as needed)
  ```
- Each **page** corresponds to a sub-folder under `data/`.
- Each **section** (or content unit) within a page is represented by a separate `.json` file.
- The frontend React application will **dynamically load** these JSON files to render content—ensuring complete decoupling of data and presentation.

### 3. **Frontend Application (React 18)**
- Built using **React 18** (with functional components and hooks).
- Implement **client-side routing** (e.g., using `react-router-dom`) to support multiple pages:
  - `/` → Home / About Me  
  - `/skills` → Skills  
  - `/projects` → Projects  
  - `/contact` → Contact  
- Components should be **modular and reusable**, reading data exclusively from the `data/` folder.
- Avoid hardcoding content; all text, links, and media references must come from JSON.

### 4. **Styling & Consistency**
- Include a global, consistent **CSS stylesheet** (or CSS modules / styled-components).
- Follow modern, responsive design principles (mobile-first).
- Ensure visual coherence across all pages (typography, colors, spacing, etc.).

### 5. **Project Structure Best Practices**
- Follow standard React project conventions.
- Separate concerns:
  - `src/components/` → Reusable UI components  
  - `src/pages/` → Page-level components  
  - `src/data/` → JSON data files (mirroring the `data/` structure)  
  - `public/` → Static assets (favicon, etc.)
- Optimize performance (code splitting, lazy loading pages if needed).

### 6. **Deployment**
- Configure the project for **GitHub Pages** deployment.
- Use tools like `gh-pages` or GitHub Actions for CI/CD.
- Ensure the deployed site:
  - Has a clean URL (e.g., `https://<username>.github.io/<repo>/`)
  - Handles client-side routing correctly (via `basename` and 404 fallback)

---

## Deliverables

1. A structured `data/` folder with JSON files representing all portfolio content.
2. A React 18 application that consumes this data to render a multi-page portfolio site.
3. Consistent, responsive styling across all pages.
4. A GitHub repository with:
   - Clean, documented code
   - Proper build & deploy scripts (`npm run deploy`, etc.)
   - Live site published on GitHub Pages

---

This specification ensures **maintainability**, **scalability**, and **content flexibility**—allowing easy updates by editing JSON files without touching React code.

---

## Build & run (how to build this workspace)

This repository contains a Vite + React app in the `portfolio-app/` folder. Follow these steps to build and run locally.

Prerequisites
- Node.js 18+ (LTS recommended) and npm or pnpm/yarn
- Git (for running the optional auto-commit script)

Local dev (recommended)

1. Open a terminal at the repository root.
2. Change to the app folder and install dependencies:

```bash
cd portfolio-app
npm install
```

3. Start the dev server (Vite):

```bash
npm run dev
```

4. Open the URL printed by Vite (usually http://localhost:5173).

Build for production

```bash
cd portfolio-app
npm run build
# to preview the production build locally
npm run preview
```

Deploy to GitHub Pages
- You can use `gh-pages` or a GitHub Actions workflow. Ensure the `homepage`/`base` is configured correctly in `vite.config.ts` or `package.json`.

Auto-commit helper (optional)
- See `scripts/auto_commit.sh` (creates periodic commits of workspace changes). Configure INTERVAL_SECONDS environment variable when running.

If you need a different package manager (pnpm/yarn), adapt the `install` and run commands accordingly.