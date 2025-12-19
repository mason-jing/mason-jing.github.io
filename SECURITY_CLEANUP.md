# Security Cleanup: Removing Sensitive Data from Git History

## Problem
Firebase credentials were committed to git history in `src/lib/firebase.ts`. These need to be removed completely.

## Solution
Use `git-filter-repo` to rewrite git history and remove sensitive data.

## ⚠️ Important Warnings

1. **This rewrites git history** - All commits will get new hashes
2. **Requires force push** - You'll need to force push to GitHub
3. **Affects all collaborators** - Everyone must re-clone the repository
4. **One-time operation** - Do this once and communicate with your team

## Steps to Clean History

### 1. Backup Current State
```bash
git branch backup-before-clean
```

### 2. Remove Sensitive Data from History
```bash
# This removes all history of src/lib/firebase.ts
git filter-repo --path src/lib/firebase.ts --invert-paths --force
```

### 3. Restore firebase.ts with Safe Version
```bash
# The file still exists locally with environment variables
git checkout HEAD -- src/lib/firebase.ts
```

### 4. Verify Changes
```bash
# Check that firebase.ts is gone from history
git log --all --full-history -- src/lib/firebase.ts

# Should show: "fatal: your current branch 'main' does not have any commits yet"
```

### 5. Force Push to GitHub
```bash
git push origin main --force-with-lease
```

### 6. Verify on GitHub
- Go to your GitHub repository
- Check that `src/lib/firebase.ts` no longer appears in history
- Verify the file exists in the current version

## For Team Members

After you force push, all collaborators must:

1. **Delete their local clone**
   ```bash
   rm -rf ~/path/to/mason-jing.github.io
   ```

2. **Re-clone the repository**
   ```bash
   git clone https://github.com/mason-jing/mason-jing.github.io.git
   ```

3. **Do NOT push from old clones** - This would restore the old history

## Verification Checklist

- [ ] Backup branch created
- [ ] History cleaned with git-filter-repo
- [ ] firebase.ts restored with environment variables
- [ ] Changes verified locally
- [ ] Force pushed to GitHub
- [ ] Verified on GitHub that history is clean
- [ ] Team members notified
- [ ] All team members re-cloned repository
- [ ] Backup branch deleted (optional)

## If Something Goes Wrong

If you need to undo this:
```bash
git reset --hard backup-before-clean
git push origin main --force-with-lease
```

## Additional Security Steps

1. ✅ Firebase credentials now use environment variables
2. ✅ `.env.local` is in `.gitignore`
3. ✅ `.env.example` provides template
4. ✅ GitHub Actions uses Secrets for deployment
5. ✅ Git history cleaned of sensitive data

## References

- [git-filter-repo documentation](https://github.com/newren/git-filter-repo)
- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)