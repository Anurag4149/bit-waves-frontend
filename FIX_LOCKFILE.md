# Fix: package-lock.json Sync Error

## Problem
GitHub Actions is failing with:
```
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync.
npm error Invalid: lock file's picomatch@2.3.1 does not satisfy picomatch@4.0.3
```

## Solution
The `package-lock.json` file in your repository is out of sync with `package.json`. 

### Steps to Fix:

1. **Update the lock file locally** (already done):
   ```bash
   npm install
   ```
   This updates `package-lock.json` to match `package.json`.

2. **Verify the lock file is in sync**:
   ```bash
   npm ci
   ```
   This should run without errors.

3. **Commit and push the updated lock file**:
   ```bash
   git add package-lock.json
   git commit -m "Update package-lock.json to sync with package.json"
   git push origin main
   ```

4. **Verify in GitHub Actions**:
   - Go to: `https://github.com/Anurag4149/bit-waves-frontend/actions`
   - The next workflow run should succeed

## Alternative: Use npm install in workflow (not recommended)

If you want to use `npm install` instead of `npm ci` in the workflow (less strict but less reliable), you can change `.github/workflows/deploy.yml`:

```yaml
- name: Install dependencies
  run: npm install
```

However, using `npm ci` is better for CI/CD as it:
- Ensures reproducible builds
- Is faster
- Fails if lock file is out of sync (catches errors early)

## Prevention

Always run `npm install` locally after modifying `package.json`, and commit `package-lock.json` along with your changes.

