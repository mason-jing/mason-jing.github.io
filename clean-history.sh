#!/bin/bash

# This script removes sensitive Firebase credentials from git history
# WARNING: This rewrites git history and requires force push

echo "⚠️  WARNING: This will rewrite git history!"
echo "Make sure all team members are aware before pushing."
echo ""
read -p "Continue? (yes/no): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Cancelled."
    exit 1
fi

# Create a backup branch before proceeding
echo "Creating backup branch..."
git branch backup-before-clean

# Remove sensitive data from firebase.ts history
echo "Removing sensitive data from git history..."
git filter-repo --path src/firebase.ts --path src/lib/firebase.ts --invert-paths --force

# Restore firebase.ts with safe version
echo "Restoring firebase.ts with environment variables..."
git checkout HEAD -- src/lib/firebase.ts

echo ""
echo "✅ History cleaned!"
echo ""
echo "Next steps:"
echo "1. Verify the changes: git log --oneline"
echo "2. Force push: git push origin main --force-with-lease"
echo "3. Delete backup branch: git branch -D backup-before-clean"
echo ""
echo "⚠️  IMPORTANT: All collaborators must:"
echo "   - Delete their local clone"
echo "   - Re-clone the repository"
echo "   - Do NOT push from old clones"
