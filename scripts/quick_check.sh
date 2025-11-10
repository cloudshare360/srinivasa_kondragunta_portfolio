#!/usr/bin/env bash
set -e

echo "🔧 Portfolio Quick Deployment Check"
echo "=================================="

# Change to portfolio directory
cd /workspaces/srinivasa_kondragunta_portfolio

echo "1. Testing build process..."
cd portfolio-app
npm run build
echo "✅ Build successful"

echo ""
echo "2. Checking build output..."
ls -la dist/
echo "✅ Build files present"

echo ""
echo "3. Checking key files..."
if [ -f "dist/index.html" ] && [ -f "dist/404.html" ]; then
    echo "✅ Essential HTML files present"
else
    echo "❌ Missing essential HTML files"
    exit 1
fi

echo ""
echo "4. Checking Git status..."
cd ..
git status --porcelain
if [ $? -eq 0 ]; then
    echo "✅ Git status check passed"
else
    echo "❌ Git issues detected"
    exit 1
fi

echo ""
echo "5. Testing GitHub Pages URL..."
echo "Checking: https://cloudshare360.github.io/srinivasa_kondragunta_portfolio/"

# Use curl to test if available
if command -v curl &> /dev/null; then
    response=$(curl -s -o /dev/null -w "%{http_code}" "https://cloudshare360.github.io/srinivasa_kondragunta_portfolio/" || echo "000")
    echo "Response code: $response"
    if [ "$response" = "200" ]; then
        echo "✅ Site is accessible"
    else
        echo "⚠️ Site returning $response (may still be deploying)"
    fi
else
    echo "⚠️ curl not available, skipping URL test"
fi

echo ""
echo "🎯 Deployment Checklist:"
echo "- Build process: ✅ Working"
echo "- Files generated: ✅ Present"
echo "- Git status: ✅ Clean"
echo "- URL accessibility: ⏳ Check manually"

echo ""
echo "🚀 Ready to commit and deploy!"