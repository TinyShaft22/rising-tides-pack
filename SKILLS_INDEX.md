# Nick's Global Skills Index

> **For Claude Code Use Only** - This file helps Claude quickly identify which skills to use for a given project or task. Read this file when asked to "check skills" or "recommend skills for this project."

**Total Skills Installed:** 95
**Plugins Available:** 12
**Last Updated:** January 24, 2026

**Related Files:**
- `MCP_REGISTRY.md` — MCP integrations and install commands
- `ATTRIBUTION.md` — Original sources for all skills

---

## NEW: MCP Plugins (Recommended)

**For MCP-dependent skills, use PLUGINS instead of standalone skills.** Plugins bundle the skill + MCP together, with automatic deferred loading via Tool Search.

### Available Plugins

Located at: `./plugins/` (relative to repo root)

| Plugin | Skill | MCP | Install Command |
|--------|-------|-----|-----------------|
| `react-dev-plugin` | react-dev | context7 | `claude --plugin-dir ./plugins/react-dev-plugin` |
| `frontend-design-plugin` | frontend-design | context7 | `claude --plugin-dir ./plugins/frontend-design-plugin` |
| `frontend-ui-plugin` | frontend-ui | context7 + shadcn | `claude --plugin-dir ./plugins/frontend-ui-plugin` |
| `mcp-builder-plugin` | mcp-builder | context7 | `claude --plugin-dir ./plugins/mcp-builder-plugin` |
| `webapp-testing-plugin` | webapp-testing | playwright | `claude --plugin-dir ./plugins/webapp-testing-plugin` |
| `browser-automation-plugin` | browser-automation | claude-in-chrome | `claude --plugin-dir ./plugins/browser-automation-plugin` |
| `video-generator-plugin` | video-generator | remotion | `claude --plugin-dir ./plugins/video-generator-plugin` |
| `git-workflow-plugin` | commit-work | github | `claude --plugin-dir ./plugins/git-workflow-plugin` |

### MCP Wrapper Plugins (Direct Access)

| Plugin | MCP | Purpose | Install Command |
|--------|-----|---------|-----------------|
| `context7-plugin` | context7 | Live documentation for any library | `claude --plugin-dir ./plugins/context7-plugin` |
| `playwright-plugin` | playwright | Browser automation | `claude --plugin-dir ./plugins/playwright-plugin` |
| `remotion-plugin` | remotion | Video generation | `claude --plugin-dir ./plugins/remotion-plugin` |
| `memory-plugin` | memory | Persistent knowledge graph | `claude --plugin-dir ./plugins/memory-plugin` |

### Why Use Plugins?

1. **Self-contained** — No separate MCP configuration needed
2. **Deferred loading** — Skills load progressively, MCPs defer via Tool Search
3. **Easy sharing** — Copy plugin folder to any project
4. **Zero context cost** — Until actually invoked

### Installing Multiple Plugins

```bash
claude --plugin-dir ./plugins/react-dev-plugin --plugin-dir ./plugins/webapp-testing-plugin
```

---

## MANDATORY: Review Every Skill

**IMPORTANT:** When recommending skills, you MUST review this entire checklist. Do not skip categories. Check EVERY skill against the project's goals.

**MCP Tags:** Skills marked with `[MCP: name]` use an MCP. **Prefer plugins** for these skills.
**Plugin Tags:** Skills marked with `[PLUGIN]` have a plugin equivalent — recommend the plugin instead.

### Master Skill Checklist (All 95 Skills)

**React/Frontend (7):**
- [ ] react-best-practices - React patterns
- [ ] react-dev - React development `[MCP: context7]` `[PLUGIN]`
- [ ] react-useeffect - useEffect patterns
- [ ] web-design-guidelines - UI/UX design
- [ ] frontend-design - Frontend architecture `[MCP: context7]` `[PLUGIN]`
- [ ] mui - Material-UI
- [ ] design-system-starter - Design systems

**Development Workflow (7):**
- [ ] session-handoff - Context transfer between sessions
- [ ] dependency-updater - Update dependencies
- [ ] qa-test-planner - QA and testing plans
- [ ] requirements-clarity - Clarify requirements
- [ ] reducing-entropy - Code organization
- [ ] agent-md-refactor - Markdown refactoring
- [ ] ship-learn-next - Ship/iterate workflow

**API Integration (3):**
- [ ] openapi-to-typescript - OpenAPI to TS
- [ ] backend-to-frontend-handoff-docs - API handoff
- [ ] frontend-to-backend-requirements - Frontend reqs

**Documentation (9):**
- [ ] doc-coauthoring - Collaborative docs
- [ ] docx - Word documents
- [ ] pdf - PDF handling
- [ ] pptx - Presentations
- [ ] xlsx - Spreadsheets
- [ ] mermaid-diagrams - Diagrams as code
- [ ] excalidraw - Whiteboard diagrams
- [ ] crafting-effective-readmes - README writing
- [ ] writing-clearly-and-concisely - Clear writing

**Marketing/SEO (16):**
- [ ] copywriting - Marketing copy
- [ ] copy-editing - Copy refinement
- [ ] seo-audit - SEO analysis
- [ ] programmatic-seo - Automated SEO
- [ ] schema-markup - Structured data
- [ ] marketing-psychology - Consumer behavior
- [ ] marketing-ideas - Campaign ideas
- [ ] social-content - Social media
- [ ] launch-strategy - Product launches
- [ ] pricing-strategy - Pricing models
- [ ] competitor-alternatives - Competitive analysis
- [ ] analytics-tracking - Analytics setup
- [ ] email-sequence - Email campaigns
- [ ] paid-ads - Paid advertising
- [ ] referral-program - Referral systems
- [ ] free-tool-strategy - Free products

**CRO/Optimization (7):**
- [ ] page-cro - Landing page optimization
- [ ] form-cro - Form optimization
- [ ] signup-flow-cro - Signup optimization
- [ ] onboarding-cro - Onboarding optimization
- [ ] paywall-upgrade-cro - Paywall optimization
- [ ] popup-cro - Popup optimization
- [ ] ab-test-setup - A/B testing

**Architecture/Planning (6):**
- [ ] c4-architecture - C4 diagrams
- [ ] mcp-builder - MCP servers `[MCP: context7]` `[PLUGIN]`
- [ ] plugin-forge - Plugin creation
- [ ] skill-creator - Skill creation
- [ ] skill-judge - Skill evaluation
- [ ] codex - Code reference

**Communication (5):**
- [ ] professional-communication - Professional writing
- [ ] feedback-mastery - Feedback skills
- [ ] difficult-workplace-conversations - Tough conversations
- [ ] daily-meeting-update - Meeting summaries
- [ ] jira - Jira integration

**Design/Visuals (6):**
- [ ] canvas-design - Canvas design
- [ ] theme-factory - Theme creation
- [ ] brand-guidelines - Brand identity
- [ ] meme-factory - Meme creation
- [ ] marp-slide - Markdown slides
- [ ] video-generator - Video creation `[MCP: remotion]` `[PLUGIN]`

**Integrations (4):**
- [ ] perplexity - Perplexity AI
- [ ] gemini - Google Gemini
- [ ] datadog-cli - Datadog monitoring
- [ ] web-to-markdown - Web to markdown

**Utilities (7):**
- [ ] humanizer - Human-like text
- [ ] naming-analyzer - Naming conventions
- [ ] domain-name-brainstormer - Domain names
- [ ] command-creator - CLI commands
- [ ] game-changing-features - Feature innovation
- [ ] webapp-testing - Web app testing `[MCP: playwright]` `[PLUGIN]`
- [ ] web-artifacts-builder - Web artifacts

**GitHub & Version Control (2):**
- [ ] github-workflow - Full GitHub lifecycle using gh CLI
- [ ] commit-work - Git commit automation `[MCP: github]` `[PLUGIN]`

**Debugging (1):**
- [ ] systematic-debugging - 4-phase root cause debugging methodology

**Database & ORM (2):**
- [ ] database-schema-designer - Schema design
- [ ] drizzle-orm - Drizzle ORM for TypeScript

**Payments (1):**
- [ ] stripe-integration - Stripe CLI payments and subscriptions

**Backend Services (3):**
- [ ] supabase-guide - Supabase backend (CLI-first)
- [ ] firebase-guide - Firebase services (CLI-first)
- [ ] google-cloud-setup - Google Cloud with gcloud CLI

**Deployment (2):**
- [ ] vercel-deployment - Vercel CLI deployment
- [ ] netlify-deployment - Netlify CLI deployment

**Auth & Security (2):**
- [ ] oauth-setup - OAuth provider configuration
- [ ] skill-safety-check - Verify skill safety before adoption

**SaaS & Starters (1):**
- [ ] saas-starter-setup - One-shot SaaS scaffolding

**Orchestration (3):**
- [ ] recommend-skills - Skill recommendation
- [ ] update-skills-index - Index maintenance
- [ ] claude.ai/vercel-deploy-claimable - Vercel deployment

---

## Quick Reference by Project Type

| Project Type | Recommended | Plugin Alternative |
|--------------|-------------|--------------------|
| **React/Next.js App** | react-best-practices, react-dev, frontend-design, mui | `react-dev-plugin`, `frontend-design-plugin` |
| **Marketing/Content** | copywriting, seo-audit, marketing-psychology, social-content | (no MCPs needed) |
| **Database Design** | database-schema-designer, schema-markup | (no MCPs needed) |
| **Documentation** | doc-coauthoring, mermaid-diagrams, crafting-effective-readmes | (no MCPs needed) |
| **Business Planning** | pricing-strategy, competitor-alternatives, marketing-ideas | (no MCPs needed) |
| **API Development** | openapi-to-typescript, backend-to-frontend-handoff-docs, mcp-builder | `mcp-builder-plugin` |
| **Video Content** | video-generator | `video-generator-plugin` |
| **E2E Testing** | webapp-testing | `webapp-testing-plugin` |

---

## MCP-Enhanced Skills → Plugin Equivalents

| Skill | MCP | Plugin (Preferred) |
|-------|-----|-------------------|
| react-dev | context7 | `react-dev-plugin` |
| frontend-design | context7 | `frontend-design-plugin` |
| mcp-builder | context7 | `mcp-builder-plugin` |
| webapp-testing | playwright | `webapp-testing-plugin` |
| commit-work | github | `git-workflow-plugin` |
| video-generator | remotion | `video-generator-plugin` |

**Direct MCP Access:**

| Wrapper | MCP | Plugin (Preferred) |
|---------|-----|-------------------|
| context7 | context7 | `context7-plugin` |
| playwright-mcp | playwright | `playwright-plugin` |
| remotion | remotion | `remotion-plugin` |
| memory-graph | memory | `memory-plugin` |

---

## Category: React & Frontend Development

| Skill | Invoke | Use When | MCP | Plugin |
|-------|--------|----------|-----|--------|
| react-best-practices | `/react-best-practices` | Building React components, following patterns | | |
| react-dev | `/react-dev` | General React development | context7 | `react-dev-plugin` |
| react-useeffect | `/react-useeffect` | Working with useEffect hooks | | |
| web-design-guidelines | `/web-design` | UI/UX decisions, layout, visual design | | |
| frontend-design | `/frontend-design` | Frontend architecture decisions | context7 | `frontend-design-plugin` |
| mui | `/mui` | Using Material-UI components | | |
| design-system-starter | `/design-system` | Creating design systems | | |

---

## Category: Marketing & SEO (Corey Haines)

| Skill | Invoke | Use When |
|-------|--------|----------|
| copywriting | `/copywriting` | Writing marketing copy, headlines, CTAs |
| copy-editing | `/copy-editing` | Refining and editing copy |
| seo-audit | `/seo-audit` | Analyzing SEO, optimizing for search |
| programmatic-seo | `/programmatic-seo` | Automated SEO strategies |
| schema-markup | `/schema-markup` | Adding structured data to pages |
| marketing-psychology | `/marketing-psychology` | Understanding consumer behavior |
| marketing-ideas | `/marketing-ideas` | Brainstorming campaigns |
| social-content | `/social-content` | Creating social media content |
| launch-strategy | `/launch-strategy` | Planning product launches |
| pricing-strategy | `/pricing-strategy` | Setting prices, pricing models |
| competitor-alternatives | `/competitor-alternatives` | Competitive analysis |
| analytics-tracking | `/analytics-tracking` | Setting up analytics |
| email-sequence | `/email-sequence` | Email marketing campaigns |
| paid-ads | `/paid-ads` | Paid advertising strategies |
| referral-program | `/referral-program` | Building referral systems |
| free-tool-strategy | `/free-tool-strategy` | Free product/lead magnet strategy |

---

## Category: Conversion Rate Optimization (CRO)

| Skill | Invoke | Use When |
|-------|--------|----------|
| page-cro | `/page-cro` | Optimizing landing pages |
| form-cro | `/form-cro` | Optimizing forms |
| signup-flow-cro | `/signup-flow-cro` | Improving signup flows |
| onboarding-cro | `/onboarding-cro` | User onboarding optimization |
| paywall-upgrade-cro | `/paywall-upgrade-cro` | Paywall/upgrade optimization |
| popup-cro | `/popup-cro` | Popup optimization |
| ab-test-setup | `/ab-test-setup` | Setting up A/B tests |

---

## Category: Documentation & Office

| Skill | Invoke | Use When |
|-------|--------|----------|
| doc-coauthoring | `/doc-coauthoring` | Collaborative document editing |
| docx | `/docx` | Creating/editing Word documents |
| pdf | `/pdf` | Creating/editing PDFs |
| pptx | `/pptx` | Creating presentations |
| xlsx | `/xlsx` | Creating spreadsheets |
| mermaid-diagrams | `/mermaid` | Creating diagrams as code |
| excalidraw | `/excalidraw` | Whiteboard-style diagrams |
| crafting-effective-readmes | `/readme` | Writing README files |
| writing-clearly-and-concisely | `/writing` | Improving writing clarity |

---

## Category: Development Workflow

| Skill | Invoke | Use When |
|-------|--------|----------|
| session-handoff | `/session-handoff` | Transferring context between sessions |
| dependency-updater | `/dependency-updater` | Updating dependencies |
| qa-test-planner | `/qa-test-planner` | Planning QA/testing |
| requirements-clarity | `/requirements` | Clarifying requirements |
| reducing-entropy | `/reducing-entropy` | Code organization |
| agent-md-refactor | `/agent-md-refactor` | Refactoring markdown |
| ship-learn-next | `/ship-learn-next` | Ship/learn/iterate workflow |
| systematic-debugging | `/systematic-debugging` | 4-phase root cause debugging |

---

## Category: GitHub & Version Control

| Skill | Invoke | Use When | MCP | Plugin |
|-------|--------|----------|-----|--------|
| github-workflow | `/github-workflow` | Full GitHub lifecycle (repos, PRs, releases) | | |
| commit-work | `/commit-work` | Git commit automation | github | `git-workflow-plugin` |

---

## Category: Database & ORM

| Skill | Invoke | Use When |
|-------|--------|----------|
| database-schema-designer | `/db-schema` | Designing database schemas |
| drizzle-orm | `/drizzle-orm` | Drizzle ORM for TypeScript |

---

## Category: API Integration

| Skill | Invoke | Use When |
|-------|--------|----------|
| openapi-to-typescript | `/openapi-ts` | Converting OpenAPI to TypeScript |
| backend-to-frontend-handoff-docs | `/api-handoff` | API documentation for frontend |
| frontend-to-backend-requirements | `/frontend-requirements` | Frontend requirements for backend |

---

## Category: Architecture & Planning

| Skill | Invoke | Use When | MCP | Plugin |
|-------|--------|----------|-----|--------|
| c4-architecture | `/c4` | C4 architecture diagrams | | |
| mcp-builder | `/mcp-builder` | Building MCP servers | context7 | `mcp-builder-plugin` |
| plugin-forge | `/plugin-forge` | Creating plugins | | |
| skill-creator | `/skill-creator` | Creating new skills | | |
| skill-judge | `/skill-judge` | Evaluating skills | | |
| codex | `/codex` | Code reference system | | |

---

## Category: Communication & Collaboration

| Skill | Invoke | Use When |
|-------|--------|----------|
| professional-communication | `/professional-comm` | Professional writing |
| feedback-mastery | `/feedback` | Giving/receiving feedback |
| difficult-workplace-conversations | `/difficult-convos` | Handling tough conversations |
| daily-meeting-update | `/daily-update` | Meeting summaries |
| jira | `/jira` | Jira ticket integration |

---

## Category: Design & Visuals

| Skill | Invoke | Use When | MCP | Plugin |
|-------|--------|----------|-----|--------|
| canvas-design | `/canvas-design` | Canvas-based design | | |
| theme-factory | `/theme-factory` | Creating themes | | |
| brand-guidelines | `/brand` | Brand identity | | |
| meme-factory | `/meme` | Creating memes | | |
| marp-slide | `/marp` | Markdown presentations | | |
| video-generator | `/video-generator` | Creating videos programmatically | remotion | `video-generator-plugin` |

---

## Category: Integrations & Tools

| Skill | Invoke | Use When |
|-------|--------|----------|
| perplexity | `/perplexity` | Perplexity AI integration |
| gemini | `/gemini` | Google Gemini integration |
| datadog-cli | `/datadog` | Datadog monitoring |
| web-to-markdown | `/web-to-md` | Converting web pages to markdown |

---

## Category: Utilities

| Skill | Invoke | Use When | MCP | Plugin |
|-------|--------|----------|-----|--------|
| humanizer | `/humanizer` | Making text more human | | |
| naming-analyzer | `/naming` | Analyzing naming conventions | | |
| domain-name-brainstormer | `/domains` | Brainstorming domain names | | |
| command-creator | `/command-creator` | Creating CLI commands | | |
| game-changing-features | `/game-changing` | Feature innovation | | |
| webapp-testing | `/webapp-testing` | Testing web applications | playwright | `webapp-testing-plugin` |
| web-artifacts-builder | `/web-artifacts` | Building web artifacts | | |

---

## Category: Payments

| Skill | Invoke | Use When |
|-------|--------|----------|
| stripe-integration | `/stripe-integration` | Stripe payments, checkout, subscriptions |

---

## Category: Backend Services

| Skill | Invoke | Use When |
|-------|--------|----------|
| supabase-guide | `/supabase-guide` | Supabase backend (database, auth, realtime) |
| firebase-guide | `/firebase-guide` | Firebase (Firestore, Auth, Hosting, Functions) |
| google-cloud-setup | `/google-cloud-setup` | Google Cloud (Cloud Run, Functions) |

---

## Category: Deployment

| Skill | Invoke | Use When |
|-------|--------|----------|
| vercel-deployment | `/vercel-deployment` | Vercel CLI deployment |
| netlify-deployment | `/netlify-deployment` | Netlify CLI deployment |

---

## Category: Auth & Security

| Skill | Invoke | Use When |
|-------|--------|----------|
| oauth-setup | `/oauth-setup` | OAuth provider configuration (Google, GitHub, Discord) |
| skill-safety-check | `/skill-safety-check` | Verify skill safety before adoption |

---

## Category: SaaS Starters

| Skill | Invoke | Use When |
|-------|--------|----------|
| saas-starter-setup | `/saas-starter-setup` | One-shot SaaS scaffolding (Next.js + Drizzle + Stripe) |

---

## Category: MCP Wrapper Plugins

**Preferred:** Use plugins for direct MCP access. Plugins bundle the MCP automatically.

| Plugin | Invoke | Use When | MCP |
|--------|--------|----------|-----|
| context7-plugin | `/context7` | Pull docs for any library | context7 |
| playwright-plugin | `/playwright` | Browser automation | playwright |
| remotion-plugin | `/remotion` | Video generation | remotion |
| memory-plugin | `/memory-graph` | Manage persistent memory | memory |

**Plugin Location:** `./plugins/`

---

## How to Use This Index

When starting a new project or task:

1. **Claude reads this file** to understand available skills
2. **For MCP-dependent skills, recommend PLUGINS** instead of manual MCP setup
3. **Claude reads the project's planning docs** (PROJECT.md, ROADMAP.md, or user's stated goals)
4. **Matches skills to goals** — uses plugins for MCP-dependent skills
5. **Suggests skills/plugins** with installation commands
6. **User confirms** which to use

**Plugin Installation:**
```bash
claude --plugin-dir /path/to/plugin
```

**Multiple Plugins:**
```bash
claude --plugin-dir ./plugins/react-dev-plugin --plugin-dir ./plugins/webapp-testing-plugin
```

**Trigger phrases:**
- "Read my project plan and the skills index, then recommend skills for what we're building"
- "Check my global skills against the roadmap"
- "What skills do I need for this project based on the plan?"

---

## Skills by Source

| Source | Count | Focus Area |
|--------|-------|------------|
| Anthropic (pre-installed) | 13 | Documents, design, MCP |
| Vercel Labs | 3 | React, web design |
| Corey Haines | 23 | Marketing, SEO, CRO |
| Softaworks | 40 | Dev workflow, architecture |
| Nick Mohler | 15 | Orchestration, video, CLI integrations |
| obra/superpowers | 1 | Debugging methodology |
| **Total** | **95** | |

---

## Plugin Summary

| Plugin | MCP | Use Case |
|--------|-----|----------|
| `react-dev-plugin` | context7 | React development with live docs |
| `frontend-design-plugin` | context7 | Frontend architecture with live docs |
| `mcp-builder-plugin` | context7 | MCP server development |
| `webapp-testing-plugin` | playwright | E2E testing and browser automation |
| `video-generator-plugin` | remotion | Programmatic video creation |
| `git-workflow-plugin` | github | Git commits and PR management |
| `context7-plugin` | context7 | Direct docs access |
| `playwright-plugin` | playwright | Direct browser automation |
| `remotion-plugin` | remotion | Direct video generation |
| `memory-plugin` | memory | Direct memory management |

**Plugin Location:** `./plugins/`

See `MCP_REGISTRY.md` for manual MCP configuration if needed.
