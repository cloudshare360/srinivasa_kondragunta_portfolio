# Portfolio Deployment Troubleshooting Guide

## Common Issues and Solutions

### 404 Error on GitHub Pages

**Problem:** Site shows 404 error when accessing the URL
**URL:** https://cloudshare360.github.io/srinivasa_kondragunta_portfolio/

**Solutions:**

1. **Check GitHub Pages Settings:**
   - Go to repository Settings → Pages
   - Ensure source is set to "GitHub Actions"
   - Wait 5-10 minutes after pushing changes

2. **Verify GitHub Actions Workflow:**
   - Check Actions tab in GitHub repository
   - Ensure "Deploy to GitHub Pages" workflow completed successfully
   - If failed, check error logs and permissions

3. **Check Base Path Configuration:**
   ```bash
   # Verify vite.config.ts has correct base path
   grep -n "base:" portfolio-app/vite.config.ts
   # Should show: base: '/srinivasa_kondragunta_portfolio/',
   ```

4. **Router Configuration:**
   ```bash
   # Verify App.tsx has correct basename
   grep -n "basename=" portfolio-app/src/App.tsx
   # Should show: <Router basename="/srinivasa_kondragunta_portfolio">
   ```

### Build Failures

**Problem:** npm run build fails

**Solutions:**

1. **Clean and Reinstall:**
   ```bash
   cd portfolio-app
   rm -rf node_modules package-lock.json dist
   npm install
   npm run build
   ```

2. **Check Node.js Version:**
   ```bash
   node --version  # Should be 18+
   npm --version   # Should be 8+
   ```

3. **TypeScript Errors:**
   ```bash
   npm run build 2>&1 | grep -i error
   # Fix any TypeScript compilation errors shown
   ```

### Development Server Issues

**Problem:** Dev server not working or wrong URL

**Solutions:**

1. **Correct Dev Server URL:**
   - Use: http://localhost:5173/srinivasa_kondragunta_portfolio/
   - NOT: http://localhost:5173/

2. **Port Already in Use:**
   ```bash
   # Kill any existing processes on port 5173
   lsof -ti:5173 | xargs kill -9
   npm run dev
   ```

3. **Check Vite Configuration:**
   ```bash
   # Ensure base path is configured in vite.config.ts
   cat portfolio-app/vite.config.ts
   ```

### Routing Issues

**Problem:** Direct URL access to routes (like /skills) returns 404

**Solutions:**

1. **Verify 404.html exists:**
   ```bash
   ls -la portfolio-app/public/404.html
   ls -la portfolio-app/dist/404.html  # After build
   ```

2. **Check SPA Redirect Script:**
   - Verify index.html contains GitHub Pages SPA redirect script
   - Check 404.html contains proper redirect logic

3. **Test Routing Locally:**
   ```bash
   cd portfolio-app
   npm run build
   npm run preview
   # Test routes at preview URL
   ```

### GitHub Actions Issues

**Problem:** Deployment workflow fails

**Solutions:**

1. **Check Workflow Permissions:**
   - Repository Settings → Actions → General
   - Ensure "Read and write permissions" is selected
   - Check "Allow GitHub Actions to create and approve pull requests"

2. **Verify Workflow File:**
   ```bash
   cat .github/workflows/deploy.yml
   # Should use actions/deploy-pages@v2
   ```

3. **Check Build Output:**
   - Actions tab → Failed workflow → View logs
   - Look for specific error messages

### Performance Issues

**Problem:** Site loads slowly

**Solutions:**

1. **Optimize Build:**
   ```bash
   cd portfolio-app
   npm run build
   # Check bundle sizes in output
   ```

2. **Check Asset Loading:**
   - Open browser dev tools
   - Check Network tab for failed requests
   - Verify all assets load from correct paths

## Validation Commands

**Quick Health Check:**
```bash
./scripts/quick_check.sh
```

**Comprehensive Testing:**
```bash
./scripts/integration_test.sh
```

**Manual Verification:**
```bash
cd portfolio-app
npm run build
npm run preview
# Test all routes manually
```

## Contact for Support

If issues persist after trying these solutions:

1. Check GitHub Issues in the repository
2. Verify all steps in README.md were followed
3. Ensure you have the latest code from main branch

## Deployment Checklist

Before deploying:
- ✅ All tests pass: `./scripts/quick_check.sh`
- ✅ Build completes: `npm run build`
- ✅ No uncommitted changes: `git status`
- ✅ On main branch: `git branch --show-current`
- ✅ Pushed to GitHub: `git push origin main`
- ✅ GitHub Actions workflow succeeded
- ✅ Wait 5-10 minutes for Pages deployment
- ✅ Test live URL: https://cloudshare360.github.io/srinivasa_kondragunta_portfolio/