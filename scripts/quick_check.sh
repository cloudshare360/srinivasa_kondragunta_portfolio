#!/usr/bin/env bash
set -e

echo "� Portfolio Optimized Deployment Check"
echo "======================================"

# Change to portfolio directory
cd /workspaces/srinivasa_kondragunta_portfolio

echo "1. Checking component integrity..."
# Verify all required page components exist
REQUIRED_FILES=(
    "portfolio-app/src/pages/Home.tsx"
    "portfolio-app/src/pages/Skills.tsx"
    "portfolio-app/src/pages/Projects.tsx"
    "portfolio-app/src/pages/Contact.tsx"
    "portfolio-app/src/components/Navigation.tsx"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

echo ""
echo "2. Validating data files..."
# Check all JSON data files
DATA_FILES=(
    "portfolio-app/src/data/about/about-me.json"
    "portfolio-app/src/data/skills/skills.json"
    "portfolio-app/src/data/projects/project-1.json"
    "portfolio-app/src/data/projects/project-2.json"
    "portfolio-app/src/data/projects/project-3.json"
    "portfolio-app/src/data/contact/contact-info.json"
)

for file in "${DATA_FILES[@]}"; do
    if [ -f "$file" ] && json_pp < "$file" >/dev/null 2>&1; then
        echo "✅ Valid JSON: $(basename "$file")"
    else
        echo "❌ Invalid JSON: $file"
        exit 1
    fi
done

echo ""
echo "3. Testing build process..."
cd portfolio-app
npm run build > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed"
    npm run build
    exit 1
fi

echo ""
echo "4. Verifying build output..."
ESSENTIAL_FILES=(
    "dist/index.html"
    "dist/404.html"
    "dist/assets"
)

for file in "${ESSENTIAL_FILES[@]}"; do
    if [ -e "dist/$file" ] || [ -e "$file" ]; then
        echo "✅ Present: $(basename "$file")"
    else
        echo "❌ Missing: $file"
        exit 1
    fi
done

echo ""
echo "5. Checking GitHub Actions workflow..."
cd ..
if [ -f ".github/workflows/deploy.yml" ]; then
    echo "✅ Deploy workflow exists"
    # Check for updated action versions
    if grep -q "upload-pages-artifact@v3" ".github/workflows/deploy.yml" && \
       grep -q "configure-pages@v4" ".github/workflows/deploy.yml"; then
        echo "✅ Using latest action versions"
    else
        echo "⚠️ Action versions may be outdated"
    fi
else
    echo "❌ Missing GitHub Actions workflow"
    exit 1
fi

echo ""
echo "6. Git status check..."
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "✅ No uncommitted changes"
else
    echo "⚠️ Uncommitted changes present - will commit automatically"
    git status --porcelain
fi

echo ""
echo "🎯 Pre-deployment Status:"
echo "- Components: ✅ All present and valid"
echo "- Data files: ✅ All JSON valid"  
echo "- Build process: ✅ Working"
echo "- Output files: ✅ Generated"
echo "- GitHub Actions: ✅ Configured"

echo ""
echo "🚀 READY FOR OPTIMIZED DEPLOYMENT!"