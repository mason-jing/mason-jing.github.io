#!/bin/bash

# This script removes sensitive files from git history
# WARNING: This rewrites git history and requires force push to all branches
# 
# Usage: ./clean-history.sh <path1> <path2> ...
# Example: ./clean-history.sh src/firebase.ts src/lib/firebase.ts

# Function to confirm user action
confirm() {
    local prompt="$1"
    local response
    read -p "$prompt (yes/no): " response
    if [ "$response" != "yes" ]; then
        echo "Cancelled."
        exit 1
    fi
}

# Function to backup files
backup_files() {
    local backup_dir="$1"
    shift  # Remove first argument (backup_dir), rest are file paths

    echo "Creating temporary backup directory: $backup_dir"
    mkdir -p "$backup_dir"

    echo "Backing up files..."
    for path in "$@"; do
        if [ -f "$path" ]; then
            mkdir -p "$backup_dir/$(dirname "$path")"
            cp "$path" "$backup_dir/$path"
            echo "  ✅ Backed up: $path"
        else
            echo "  ⚠️ File not found: $path (will skip restore)"
        fi
    done
}

# Function to filter git history
filter_history() {
    echo "Running git filter-repo..."
    echo "This will remove the following paths from git history:"
    for path in "$@"; do
        echo "  - $path"
    done
    echo ""
    echo "⚠️ WARNING: git filter-repo will delete any uncommitted changes!"
    echo "Make sure all your changes are committed before proceeding."
    echo ""
    confirm "Proceed with filtering?"

    local filter_paths=""
    for path in "$@"; do
        filter_paths="$filter_paths --path $path"
    done

    git filter-repo $filter_paths --invert-paths --force
    echo "✅ History filtered"
}

# Function to setup remote and fetch
setup_remote() {
    echo "Re-adding remote repository..."
    git remote add origin git@github.com:mason-jing/mason-jing.github.io.git 2>/dev/null || \
    git remote set-url origin git@github.com:mason-jing/mason-jing.github.io.git

    # Fetch remote branches to update local tracking information
    echo "Fetching remote branches..."
    git fetch origin 2>/dev/null || echo "⚠️ Could not fetch from remote (may not exist yet)"
}

# Function to restore backed up files
restore_files() {
    local backup_dir="$1"
    shift  # Remove first argument (backup_dir), rest are file paths

    echo "Restoring files..."
    for path in "$@"; do
        if [ -f "$backup_dir/$path" ]; then
            mkdir -p "$(dirname "$path")"
            cp "$backup_dir/$path" "$path"
            git add "$path"
            echo "  ✅ Restored: $path"
        else
            echo "  ⚠️ Backup not found: $path"
        fi
    done
}

# Function to commit and cleanup
commit_and_cleanup() {
    local backup_dir="$1"

    # Review and confirm before committing files
    if git diff --cached --quiet; then
        echo "No files to commit"
    else
        echo "📝 Files to be committed:"
        git diff --cached --name-only
        echo ""
        confirm "Commit these restored files?"

        git commit -m "feat: restore files with safe content" 2>/dev/null || true
        echo "✅ Files committed"
    fi

    echo ""
    echo "Cleaning up temporary backup directory: $backup_dir"
    rm -rf "$backup_dir"
    echo "✅ Cleanup complete"
}

# Function to verify changes
verify_changes() {
    echo "Verifying the changes:"
    git log --oneline | head -5
    echo ""
    echo "Verifying history is clean:"
    for path in "$@"; do
        if git log --all --full-history -- "$path" 2>/dev/null | grep -q .; then
            echo "  ⚠️ Found commits for: $path"
        else
            echo "  ✅ History clean for: $path"
        fi
    done
}

# Function to force push all branches
force_push_branches() {
    echo "Getting list of all branches:"
    local branches=$(git branch -a | grep -v "^\*" | sed 's/^[[:space:]]*remotes\/origin\///' | sort -u)
    echo "$branches"
    echo ""
    echo "Force pushing all branches:"
    for branch in $branches; do
        # Skip HEAD and remote tracking branches
        if [[ "$branch" == "HEAD"* ]] || [[ "$branch" == *"->"* ]]; then
            continue
        fi

        echo "   Pushing $branch..."
        git push origin "$branch" --force-with-lease 2>/dev/null && echo "  ✅ Pushed: $branch" || echo "  ⚠️ Failed to push: $branch"
    done
    echo "✅ Force push complete"
}

if [ $# -eq 0 ]; then
    echo "❌ Error: No paths specified"
    echo "Usage: ./clean-history.sh <path1> <path2> ..."
    echo "Example: ./clean-history.sh src/firebase.ts src/lib/firebase.ts"
    exit 1
fi

echo "⚠️ WARNING: This will rewrite git history on ALL branches!"
echo "Make sure all team members are aware before pushing."
echo "Paths to remove: $@"
echo ""
confirm "Do you understand the risks?"

echo ""
echo "This script will execute the following stages:"
echo "  STAGE 1: Backup files and create backup branch"
echo "  STAGE 2: Run git filter-repo and re-add remote"
echo "  STAGE 3: Restore files"
echo "  STAGE 4: Verify changes"
echo "  STAGE 5: Force push all branches and delete backup branch"
echo ""
confirm "Ready to proceed?"

echo ""
echo "STAGE 1: Backing up files and creating backup branch"
echo "This will:"
echo "  - Create a temporary backup of your files"
echo "  - Create a git branch called 'backup-before-clean' for safety"
confirm "Continue?"

BACKUP_DIR=".git-filter-backup-$(date +%Y%m%d_%H%M%S)"
backup_files "$BACKUP_DIR" "$@"

git branch backup-before-clean
echo "✅ Backup branch created"

echo ""
echo "STAGE 2: Running git filter-repo and re-adding remote"
echo "This will:"
echo "  - Rewrite git history and remove the specified paths"
echo "  - Re-add the remote repository"
echo "  - Fetch remote branches"
confirm "Continue?"

filter_history "$@"

setup_remote

echo ""
echo "STAGE 3: Restoring files"
echo "This will:"
echo "  - Restore your backed up files"
echo "  - Commit the restored files"
echo "  - Clean up temporary backup directory"
confirm "Continue?"

restore_files "$BACKUP_DIR" "$@"

commit_and_cleanup "$BACKUP_DIR"

echo ""
echo "STAGE 4: Verifying changes"
echo "This will:"
echo "  - Verify the changes in git log"
echo "  - Verify history is clean"
confirm "Continue?"

verify_changes "$@"

echo ""
echo "STAGE 5: Force pushing all branches and deleting backup branch"
echo "This will:"
echo "  - Get list of all branches"
echo "  - Force push all branches to remote"
echo "  - Delete the git branch called 'backup-before-clean'"
confirm "Continue?"

force_push_branches

git branch -D backup-before-clean
echo "✅ Backup branch deleted"

echo ""
echo "✅ All done! Your repository is now clean."
echo ""
echo "⚠️ IMPORTANT: All collaborators must:"
echo "   - Delete their local clone"
echo "   - Re-clone the repository"
echo "   - Do NOT push from old clones"
echo ""