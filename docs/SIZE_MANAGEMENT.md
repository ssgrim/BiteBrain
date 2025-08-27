# Repository Size Management

## 📊 Current Size Status

Run `pnpm size-check` to get a complete size report.

## 🧹 Cleanup Commands

```bash
# Clean build artifacts and cache
pnpm clean

# Clean specific build outputs
pnpm clean:build

# Clean cache files only
pnpm clean:cache

# Clean log files
pnpm clean:logs

# Nuclear option: clean everything and reinstall
pnpm clean:all

# Check repository size
pnpm size-check
```

## 🚫 Files Automatically Ignored

Our `.gitignore` prevents these large files from being committed:

### Build Artifacts
- `dist/`, `.next/`, `build/`, `coverage/`
- `.turbo/` (Turborepo cache)
- `.cache/`, `.parcel-cache/`

### Dependencies
- `node_modules/`
- `.pnpm-store/`

### Temporary Files
- `*.log`, `*.tmp`
- `.DS_Store`, `Thumbs.db`
- Cache files (`.eslintcache`, `.stylelintcache`)

### Archives
- `*.zip`, `*.tar.gz`, `*.7z`, `*.rar`

## 🔍 Size Monitoring

### Manual Checks
```bash
# Overall size breakdown
du -sh . node_modules .git

# Find large files (>5MB)
pnpm size:analyze

# Full size report
pnpm size:report
```

### Automated Monitoring
The pre-commit hook can be extended to warn about large files:

```bash
# Add to .husky/pre-commit
echo "Checking for large files..."
git diff --cached --name-only | xargs -I {} find {} -size +1M 2>/dev/null | head -5
```

## 📈 Size Optimization Strategies

### 1. Dependency Management
- Use `pnpm` for efficient dependency storage
- Regularly audit dependencies: `pnpm audit`
- Remove unused dependencies: `pnpm prune`

### 2. Build Optimization
- Turbo caching reduces build times
- Regular cleanup of build artifacts
- Use `.turbo/` for intelligent caching

### 3. Asset Management
- Compress images before committing
- Use external CDNs for large assets
- Keep media files in separate repositories

### 4. CI/CD Optimization
- Cache `node_modules` in CI
- Use multi-stage Docker builds
- Implement size budgets in CI

## ⚠️ Size Limits & Warnings

### Git Repository
- Keep individual files under 100MB
- Total repository should stay under 1GB (excluding node_modules)
- Use Git LFS for large binary files if needed

### CI/CD Considerations
- GitHub Actions has 6GB workspace limit
- Docker images should be optimized for size
- Use caching strategies for dependencies

## 🚀 Automated Solutions

### Pre-commit Size Check
Add to `.husky/pre-commit`:
```bash
# Check for files larger than 10MB
git diff --cached --name-only | while read file; do
  if [ -f "$file" ] && [ $(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null || echo 0) -gt 10485760 ]; then
    echo "Warning: $file is larger than 10MB"
    exit 1
  fi
done
```

### GitHub Action for Size Monitoring
```yaml
- name: Check repository size
  run: |
    REPO_SIZE=$(du -sh . | cut -f1)
    echo "Repository size: $REPO_SIZE"
    if [[ $(du -s . | cut -f1) -gt 1048576 ]]; then
      echo "⚠️ Repository is larger than 1GB"
    fi
```

## 📋 Regular Maintenance

### Weekly
- `pnpm clean` - Clean build artifacts
- `pnpm size-check` - Monitor size growth

### Monthly
- `pnpm audit` - Check for dependency vulnerabilities
- Review and remove unused dependencies
- Check for large files that crept in

### Before Major Releases
- `pnpm clean:all` - Full cleanup and reinstall
- Verify CI/CD performance
- Update size budgets if needed
