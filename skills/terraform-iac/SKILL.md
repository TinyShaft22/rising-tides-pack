---
name: terraform-iac
description: "Use when working with Terraform, OpenTofu, HCL, or infrastructure as code. Invoke for module development, state management, testing strategies, CI/CD pipelines, and IaC best practices."
---

# Terraform / Infrastructure as Code

Comprehensive Terraform and OpenTofu guidance covering module development, testing, CI/CD, security, and production patterns. Based on terraform-best-practices.com and enterprise experience.

## When to Activate

- Creating or refactoring Terraform/OpenTofu configurations or modules
- Setting up IaC testing infrastructure (native tests, Terratest, static analysis)
- Structuring multi-environment deployments
- Implementing CI/CD pipelines for infrastructure
- Choosing between module patterns or state management approaches
- Security scanning and compliance for infrastructure code

## Do Not Use For

- Basic HCL syntax (Claude already knows this)
- Provider-specific API reference (link to provider docs)
- Cloud platform questions unrelated to Terraform/OpenTofu

## Core Principles

### Module Hierarchy

| Type | When to Use | Scope |
|------|-------------|-------|
| **Resource Module** | Single logical group of connected resources | VPC + subnets, Security group + rules |
| **Infrastructure Module** | Collection of resource modules for a purpose | Multiple resource modules in one region/account |
| **Composition** | Complete infrastructure | Spans multiple regions/accounts |

**Hierarchy:** Resource -> Resource Module -> Infrastructure Module -> Composition

### Directory Structure

```
environments/        # Environment-specific configurations
  prod/
  staging/
  dev/

modules/            # Reusable modules
  networking/
  compute/
  data/

examples/           # Module usage examples (also serve as tests)
  complete/
  minimal/
```

Key principles:
- Separate environments (prod, staging) from modules (reusable components)
- Use examples/ as both documentation and integration test fixtures
- Keep modules small and focused (single responsibility)

**Detailed guide:** [Code Patterns: Module Types & Hierarchy](references/code-patterns.md)

### Standard Module Structure

```
my-module/
  README.md           # Usage documentation
  main.tf             # Primary resources
  variables.tf        # Input variables with descriptions
  outputs.tf          # Output values
  versions.tf         # Provider version constraints
  examples/
    minimal/          # Minimal working example
    complete/         # Full-featured example
  tests/
    module_test.tftest.hcl
```

## Naming Conventions

**Resources:**
```hcl
# Descriptive, contextual
resource "aws_instance" "web_server" { }
resource "aws_s3_bucket" "application_logs" { }

# "this" for singleton resources (only one of that type in module)
resource "aws_vpc" "this" { }
resource "aws_security_group" "this" { }
```

**Variables:** Prefix with context -- `var.vpc_cidr_block` not `var.cidr`, `var.database_instance_class` not `var.instance_class`.

**Files:** `main.tf`, `variables.tf`, `outputs.tf`, `versions.tf`, `data.tf` (optional).

## Code Structure Standards

### Resource Block Ordering

1. `count` or `for_each` FIRST (blank line after)
2. Other arguments
3. `tags` as last real argument
4. `depends_on` after tags (if needed)
5. `lifecycle` at the very end (if needed)

```hcl
resource "aws_nat_gateway" "this" {
  count = var.create_nat_gateway ? 1 : 0

  allocation_id = aws_eip.this[0].id
  subnet_id     = aws_subnet.public[0].id

  tags = {
    Name = "${var.name}-nat"
  }

  depends_on = [aws_internet_gateway.this]

  lifecycle {
    create_before_destroy = true
  }
}
```

### Variable Block Ordering

1. `description` (ALWAYS required)
2. `type`
3. `default`
4. `validation`
5. `nullable` (when setting to false)

### Count vs For_Each

| Scenario | Use | Why |
|----------|-----|-----|
| Boolean condition (create or not) | `count = condition ? 1 : 0` | Simple on/off toggle |
| Items may be reordered/removed | `for_each = toset(list)` | Stable resource addresses |
| Reference by key | `for_each = map` | Named access to resources |
| Simple numeric replication | `count = 3` | Fixed number of identical resources |

Prefer `for_each` when list items may change -- removing a middle item with `count` recreates all subsequent resources.

### Locals for Dependency Management

Use locals with `try()` to ensure correct resource deletion order:

```hcl
locals {
  vpc_id = try(
    aws_vpc_ipv4_cidr_block_association.this[0].vpc_id,
    aws_vpc.this.id,
    ""
  )
}

resource "aws_subnet" "public" {
  vpc_id     = local.vpc_id  # Uses local, not direct reference
  cidr_block = "10.1.0.0/24"
}
```

This prevents deletion errors and ensures correct dependency order without explicit `depends_on`.

## Testing Strategy

### Decision Matrix

| Situation | Approach | Tools | Cost |
|-----------|----------|-------|------|
| Quick syntax check | Static analysis | `terraform validate`, `fmt` | Free |
| Pre-commit validation | Static + lint | `validate`, `tflint`, `trivy`, `checkov` | Free |
| Terraform 1.6+, simple logic | Native test framework | `terraform test` | Free-Low |
| Pre-1.6, or Go expertise | Integration testing | Terratest | Low-Med |
| Security/compliance focus | Policy as code | OPA, Sentinel | Free |
| Cost-sensitive workflow | Mock providers (1.7+) | Native tests + mocking | Free |
| Multi-cloud, complex | Full integration | Terratest + real infra | Med-High |

### Testing Pyramid

```
        /\            End-to-End (Expensive)
       /  \           Full environment deployment
      /____\
     /      \         Integration (Moderate)
    /________\        Module testing, real resources
   /          \
  /____________\      Static Analysis (Cheap)
                      validate, fmt, lint, security scanning
```

### Native Test Best Practices (1.6+)

- `command = plan` -- Fast, for input validation
- `command = apply` -- Required for computed values and set-type blocks
- Set-type blocks cannot be indexed with `[0]`; use `for` expressions or `command = apply`

**Detailed guides:**
- [Testing Frameworks](references/testing-frameworks.md)
- [Quick Reference](references/quick-reference.md#testing-approach-selection)

## CI/CD Integration

### Recommended Stages

1. **Validate** -- Format check + syntax validation + linting
2. **Test** -- Automated tests (native or Terratest)
3. **Plan** -- Generate and review execution plan
4. **Apply** -- Execute changes (with approvals for production)

### Cost Optimization

1. Use mocking for PR validation (free)
2. Run integration tests only on main branch (controlled cost)
3. Implement auto-cleanup (prevent orphaned resources)
4. Tag all test resources (track spending)

**Detailed guide:** [CI/CD Workflows](references/ci-cd-workflows.md)

## Security and Compliance

### Essential Checks

```bash
trivy config .
checkov -d .
```

### Rules

- Never store secrets in variables -- use Secrets Manager / Parameter Store
- Never use default VPC -- create dedicated VPCs
- Always enable encryption at rest
- Use least-privilege security groups (never 0.0.0.0/0)

**Detailed guide:** [Security & Compliance](references/security-compliance.md)

## Version Management

### Constraint Strategy

| Component | Strategy | Example |
|-----------|----------|---------|
| Terraform | Pin minor | `required_version = "~> 1.9"` |
| Providers | Pin major | `version = "~> 5.0"` |
| Modules (prod) | Pin exact | `version = "5.1.2"` |
| Modules (dev) | Allow patch | `version = "~> 5.1"` |

### Modern Features by Version

| Feature | Version | Use Case |
|---------|---------|----------|
| `try()` | 0.13+ | Safe fallbacks |
| `nullable = false` | 1.1+ | Prevent null values |
| `moved` blocks | 1.1+ | Refactor without destroy/recreate |
| `optional()` with defaults | 1.3+ | Optional object attributes |
| Native testing | 1.6+ | Built-in test framework |
| Mock providers | 1.7+ | Cost-free unit testing |
| Provider functions | 1.8+ | Provider-specific transforms |
| Cross-variable validation | 1.9+ | Validate between variables |
| Write-only arguments | 1.11+ | Secrets never in state |

### Terraform vs OpenTofu

Both fully supported. See [Quick Reference](references/quick-reference.md#terraform-vs-opentofu-comparison) for comparison.

## Reference Files

- [Testing Frameworks](references/testing-frameworks.md) -- Static analysis, native tests, Terratest
- [Module Patterns](references/module-patterns.md) -- Variable/output best practices, DO vs DON'T patterns
- [CI/CD Workflows](references/ci-cd-workflows.md) -- GitHub Actions, GitLab CI, Atlantis, cost optimization
- [Security & Compliance](references/security-compliance.md) -- Trivy/Checkov, secrets management, compliance
- [Code Patterns](references/code-patterns.md) -- Block ordering, count vs for_each, version management
- [Quick Reference](references/quick-reference.md) -- Command cheat sheets, decision flowcharts, troubleshooting

## Attribution

Adapted from [terraform-skill](https://github.com/antonbabenko/terraform-skill) by Anton Babenko (Apache-2.0).
