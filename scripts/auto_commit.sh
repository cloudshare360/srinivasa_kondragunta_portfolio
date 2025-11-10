#!/usr/bin/env bash
set -u

# Auto-commit script: run from repository root (or call from CI/dev-machine).
# It will create commits when there are changes. Configure INTERVAL_SECONDS to adjust frequency.

INTERVAL_SECONDS=${INTERVAL_SECONDS:-300}
COMMIT_MSG_PREFIX=${COMMIT_MSG_PREFIX:-"auto: snapshot"}

# Resolve repo root (two levels up if script is inside scripts/)
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT" || exit 1

echo "Starting auto-commit loop (interval=${INTERVAL_SECONDS}s). Press Ctrl+C to stop."

while true; do
  # check for any changes
  if [ -n "$(git status --porcelain)" ]; then
    git add -A
    git commit -m "$COMMIT_MSG_PREFIX $(date -u +"%Y-%m-%dT%H:%M:%SZ")" || true
  fi
  sleep "$INTERVAL_SECONDS"
done
