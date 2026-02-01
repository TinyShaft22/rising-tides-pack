---
name: cicd-pipelines
description: "Use when creating CI/CD workflows, debugging pipeline failures, implementing DevSecOps security scanning (SAST/DAST/SCA), optimizing build performance, implementing caching strategies, or setting up deployments. Invoke for GitHub Actions, GitLab CI, pipeline troubleshooting, and secure pipeline design with OIDC and secrets management."
---

# CI/CD Pipelines

Comprehensive guide for CI/CD pipeline design, optimization, security, and troubleshooting across GitHub Actions, GitLab CI, and other platforms.

## When to Use This Skill

Use this skill when:
- Creating new CI/CD workflows or pipelines
- Debugging pipeline failures or flaky tests
- Optimizing slow builds or test suites
- Implementing caching strategies
- Setting up deployment workflows
- Securing pipelines (secrets, OIDC, supply chain)
- Implementing DevSecOps security scanning (SAST, DAST, SCA)
- Troubleshooting platform-specific issues
- Implementing matrix builds or test sharding

## Core Workflows

### 1. Creating a New Pipeline

**Basic pipeline structure:**
```yaml
# 1. Fast feedback (lint, format) - <1 min
# 2. Unit tests - 1-5 min
# 3. Integration tests - 5-15 min
# 4. Build artifacts
# 5. E2E tests (optional, main branch only)
# 6. Deploy (with approval gates)
```

**Key principles:**
- Fail fast: Run cheap validation first
- Parallelize: Remove unnecessary job dependencies
- Cache dependencies: Use `actions/cache` or GitLab cache
- Use artifacts: Build once, deploy many times

### 2. Optimizing Pipeline Performance

**Analyze existing pipeline:**
```bash
python3 scripts/pipeline_analyzer.py --platform github --workflow .github/workflows/ci.yml
```

**Quick wins:**
- [ ] Add dependency caching (50-90% faster)
- [ ] Remove unnecessary `needs` dependencies
- [ ] Add path filters to skip unnecessary runs
- [ ] Use `npm ci` instead of `npm install`
- [ ] Add job timeouts
- [ ] Enable concurrency cancellation

### 3. Securing Your Pipeline

**Essential security checklist:**
- [ ] Use OIDC instead of static credentials
- [ ] Pin actions/includes to commit SHAs
- [ ] Use minimal permissions
- [ ] Enable secret scanning
- [ ] Add vulnerability scanning
- [ ] Implement branch protection

### 4. Troubleshooting Pipeline Failures

**Check pipeline health:**
```bash
python3 scripts/ci_health.py --platform github --repo owner/repo
```

| Error Pattern | Common Cause | Quick Fix |
|---------------|--------------|-----------|
| "Module not found" | Missing dependency | Clear cache, `npm ci` |
| "Timeout" | Job too long | Add caching, increase timeout |
| "Permission denied" | Missing permissions | Add to `permissions:` block |
| Intermittent failures | Flaky tests | Add retries, fix timing |

### 5. Deployment Workflows

| Pattern | Use Case | Complexity | Risk |
|---------|----------|------------|------|
| Direct | Simple apps | Low | Medium |
| Blue-Green | Zero downtime | Medium | Low |
| Canary | Gradual rollout | High | Very Low |
| Rolling | Kubernetes | Medium | Low |

### 6. DevSecOps Security Scanning

| Scan Type | Purpose | Tools |
|-----------|---------|-------|
| Secret Scanning | Find exposed credentials | TruffleHog, Gitleaks |
| SAST | Code vulnerabilities | CodeQL, Semgrep, Bandit |
| SCA | Dependency vulnerabilities | npm audit, pip-audit, Snyk |
| Container Scanning | Image vulnerabilities | Trivy, Grype |
| DAST | Runtime vulnerabilities | OWASP ZAP |

## Diagnostic Scripts

### pipeline_analyzer.py
Analyzes workflow configuration for optimization opportunities.
```bash
python3 scripts/pipeline_analyzer.py --platform github --workflow .github/workflows/ci.yml
```

### ci_health.py
Checks pipeline status and identifies issues.
```bash
python3 scripts/ci_health.py --platform github --repo owner/repo --limit 20
```

## Common Patterns

### Caching (GitHub Actions)
```yaml
- uses: actions/cache@v4
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
```

### Matrix Builds
```yaml
strategy:
  matrix:
    os: [ubuntu-latest, macos-latest]
    node: [18, 20, 22]
  fail-fast: false
```

## Reference Documentation

- **references/best_practices.md** - Pipeline design, testing, deployment patterns
- **references/security.md** - Secrets management, OIDC, supply chain security
- **references/devsecops.md** - SAST, DAST, SCA, container security
- **references/optimization.md** - Caching, parallelization, performance tuning
- **references/troubleshooting.md** - Common issues and platform-specific debugging

## Best Practices

**Performance:** Cache dependencies, parallelize jobs, use path filters
**Security:** OIDC auth, pin actions to SHAs, secret scanning
**Reliability:** Timeouts, retry logic, health checks, concurrency cancellation
**Maintainability:** Reusable workflows, documentation, regular updates
