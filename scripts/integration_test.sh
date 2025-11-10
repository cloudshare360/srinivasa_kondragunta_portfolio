#!/usr/bin/env bash
set -e

echo "🚀 Starting Portfolio Integration Tests"
echo "======================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test results tracking
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function for test results
test_result() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ PASS${NC}: $2"
        ((TESTS_PASSED++))
    else
        echo -e "${RED}❌ FAIL${NC}: $2"
        ((TESTS_FAILED++))
    fi
}

# Function to test a URL
test_url() {
    local url="$1"
    local description="$2"
    local expected_status="${3:-200}"
    
    echo -e "${YELLOW}Testing:${NC} $description"
    
    if command -v curl &> /dev/null; then
        status_code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || echo "000")
        if [ "$status_code" = "$expected_status" ]; then
            test_result 0 "$description (Status: $status_code)"
        else
            test_result 1 "$description (Expected: $expected_status, Got: $status_code)"
        fi
    else
        echo -e "${YELLOW}⚠️ SKIP${NC}: curl not available, cannot test URL"
    fi
}

echo "📦 Test 1: Package Dependencies"
cd /workspaces/srinivasa_kondragunta_portfolio/portfolio-app
if npm list --depth=0 &>/dev/null; then
    test_result 0 "All package dependencies are satisfied"
else
    test_result 1 "Package dependencies have issues"
fi

echo ""
echo "🔨 Test 2: Build Process"
if npm run build &>/dev/null; then
    test_result 0 "Production build completes successfully"
else
    test_result 1 "Production build failed"
fi

echo ""
echo "📁 Test 3: Build Output Validation"
DIST_DIR="/workspaces/srinivasa_kondragunta_portfolio/portfolio-app/dist"

# Check if dist directory exists
if [ -d "$DIST_DIR" ]; then
    test_result 0 "Build output directory exists"
else
    test_result 1 "Build output directory missing"
fi

# Check for essential files
for file in "index.html" "404.html"; do
    if [ -f "$DIST_DIR/$file" ]; then
        test_result 0 "Essential file present: $file"
    else
        test_result 1 "Essential file missing: $file"
    fi
done

# Check for assets directory
if [ -d "$DIST_DIR/assets" ]; then
    test_result 0 "Assets directory exists"
    
    # Count asset files
    asset_count=$(find "$DIST_DIR/assets" -type f | wc -l)
    if [ "$asset_count" -gt 0 ]; then
        test_result 0 "Asset files generated ($asset_count files)"
    else
        test_result 1 "No asset files found"
    fi
else
    test_result 1 "Assets directory missing"
fi

echo ""
echo "🔍 Test 4: Content Validation"

# Check if index.html contains expected content
if grep -q "Srinivasa Kondragunta" "$DIST_DIR/index.html"; then
    test_result 0 "Index.html contains correct title"
else
    test_result 1 "Index.html missing correct title"
fi

# Check for React app div
if grep -q 'id="root"' "$DIST_DIR/index.html"; then
    test_result 0 "React root element present"
else
    test_result 1 "React root element missing"
fi

echo ""
echo "⚙️ Test 5: Configuration Validation"

# Check vite.config.ts for correct base path
CONFIG_FILE="/workspaces/srinivasa_kondragunta_portfolio/portfolio-app/vite.config.ts"
if grep -q "base: '/srinivasa_kondragunta_portfolio/'" "$CONFIG_FILE"; then
    test_result 0 "Vite base path configured correctly"
else
    test_result 1 "Vite base path configuration incorrect"
fi

# Check package.json for deploy script
PACKAGE_FILE="/workspaces/srinivasa_kondragunta_portfolio/portfolio-app/package.json"
if grep -q '"deploy"' "$PACKAGE_FILE"; then
    test_result 0 "Deploy script present in package.json"
else
    test_result 1 "Deploy script missing from package.json"
fi

echo ""
echo "🔄 Test 6: Development Server"
echo -e "${YELLOW}Testing:${NC} Development server startup"

# Start dev server in background and test if it responds
cd /workspaces/srinivasa_kondragunta_portfolio/portfolio-app
npm run dev &>/dev/null &
DEV_PID=$!

# Wait for server to start
sleep 5

# Test if server is responding
if curl -s -o /dev/null "http://localhost:5173/srinivasa_kondragunta_portfolio/"; then
    test_result 0 "Development server responds correctly"
else
    test_result 1 "Development server not responding"
fi

# Clean up
kill $DEV_PID 2>/dev/null || true
sleep 2

echo ""
echo "🌐 Test 7: GitHub Pages URL Tests"

# Test the main GitHub Pages URL
BASE_URL="https://cloudshare360.github.io/srinivasa_kondragunta_portfolio"
test_url "$BASE_URL/" "Main portfolio page"
test_url "$BASE_URL/skills" "Skills page" 
test_url "$BASE_URL/projects" "Projects page"
test_url "$BASE_URL/contact" "Contact page"

echo ""
echo "📊 Test 8: Git Repository Status"

cd /workspaces/srinivasa_kondragunta_portfolio

# Check if we're on the right branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" = "main" ]; then
    test_result 0 "On correct branch (main)"
else
    test_result 1 "Not on main branch (current: $CURRENT_BRANCH)"
fi

# Check if there are uncommitted changes
if git diff-index --quiet HEAD --; then
    test_result 0 "No uncommitted changes"
else
    test_result 1 "Uncommitted changes present"
fi

# Check if we're up to date with remote
if git diff --quiet HEAD @{u} 2>/dev/null; then
    test_result 0 "Local branch up to date with remote"
else
    test_result 1 "Local branch differs from remote or no upstream"
fi

echo ""
echo "==============================================="
echo "🏁 Integration Test Results"
echo "==============================================="
echo -e "Tests Passed: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests Failed: ${RED}$TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 All tests passed! Portfolio is ready for deployment.${NC}"
    exit 0
else
    echo -e "\n${RED}⚠️  Some tests failed. Please review and fix issues before deploying.${NC}"
    exit 1
fi