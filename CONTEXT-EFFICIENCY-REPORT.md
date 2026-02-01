# Context Efficiency Report — Rising Tides Skills Pack

**Date:** 2026-01-31
**Status:** PRELIMINARY — More testing needed
**Test Environment:** WSL2, Claude Code with Opus 4.5, 200k context window
**Test Project:** TaskFlow SaaS (Next.js 14 + Supabase + Stripe + Drizzle + Vercel)

---

## Current Measured Numbers

### Full System Baseline (196 skills, 4 MCPs, 11 agents)

| Category | Tokens | % of 200k | Source |
|----------|--------|-----------|--------|
| System prompt | 3,100 | 1.6% | Claude Code (fixed) |
| MCP tools | 11,300 | 5.7% | 49 tools from 4 MCPs |
| Custom agents | 531 | 0.3% | 11 GSD agents |
| Skills | 20,400 | 10.2% | 196 skill frontmatters |
| Plugin | 68 | 0.0% | frontend-design |
| Autocompact buffer | 33,000 | 16.5% | Claude Code (fixed) |
| **Total baseline** | **~35,000** | **18%** | |
| **Free for work** | **~132,000** | **66%** | |

### Scaling Comparison

| Configuration | Skills Cost | Total Baseline | Free Space |
|--------------|-------------|----------------|------------|
| 79 skills (original) | 13.7k | 33k (16%) | 134k (67%) |
| 196 skills (full system) | 20.4k | 35k (18%) | 132k (66%) |
| Per additional skill | ~57 tokens | — | — |

### MCP Tool Breakdown (11.3k total)

| MCP | Tools | Tokens | Notes |
|-----|-------|--------|-------|
| playwright | 23 | ~3,800 | Browser automation |
| claude-in-chrome | 17 | ~5,300 | Chrome extension |
| shadcn | 7 | ~1,300 | Component registry |
| context7 | 2 | ~893 | Live docs |

### Key Per-Unit Costs

| Unit | Avg Tokens | Notes |
|------|-----------|-------|
| Skill frontmatter | ~104 | Range: 33-187 tokens |
| GSD agent | ~48 | 11 agents total |
| MCP tool schema | ~231 | Range: 75-1,300 tokens |

---

## What We Know Works

1. **Progressive disclosure:** Only frontmatter loads at startup (~104 tokens/skill). Full SKILL.md content (avg 2,418 tokens, up to 70k) does NOT load on auto-invocation — only on explicit `/skill-name`.
2. **Skill scaling is cheap:** 79→196 skills added only 6.7k tokens. Adding skills is ~57 tokens each.
3. **No duplicate loading** (after fix): Removing project-level copies of user-level skills eliminated ~1.3k wasted tokens.
4. **ENABLE_TOOL_SEARCH=auto:** Defers some MCP schemas briefly at startup (11.3k→5.7k on first `/context`), but they load back on first interaction. Net benefit is minimal for sustained sessions.

## What We DON'T Know Yet (Needs Testing)

### 1. Can MCP schemas be fully deferred until needed?

Current state: All 49 MCP tool schemas load at 11.3k tokens regardless of whether the user needs playwright or chrome tools. This is the single biggest cost after skills.

**Open questions:**
- Can MCPs be bundled inside plugins such that schemas only load when the plugin/skill is invoked?
- Does the MCP transport type (stdio vs Docker vs HTTP/SSE) affect when schemas load?
- Can project-level `.mcp.json` be structured to defer loading?
- Is there a way to register MCPs without loading their tool schemas until first use?
- Would splitting MCPs across multiple `.mcp.json` files (global vs project) change loading behavior?

### 2. Does explicit `/skill-name` load full SKILL.md?

We confirmed auto-invocation does NOT load full content. We did NOT test:
- Does `/drizzle-orm` explicitly load the full 2k token SKILL.md?
- Does the Skill tool invocation (shown in system prompt) load content?
- What's the difference between frontmatter trigger matching vs explicit slash command?

### 3. Plugin loading behavior

- `frontend-design: 68 tokens` appears under Plugin section with no `--plugin-dir` flag. Why?
- Does `--plugin-dir` load the full SKILL.md or just frontmatter?
- Can plugins defer their MCP config until the skill is invoked?

### 4. Project vs User skill sections

- After deleting project `.claude/skills/`, the Project section still showed ~79 skills. Where are they coming from? (Possibly CLAUDE.md or another project config source)
- The User section showed all 196 skills correctly.
- Does having skills in both sections cause any overhead beyond the token count?

### 5. Optimal MCP architecture for context efficiency

Need to research and test:
- **stdio (npx):** Current approach. All schemas preload.
- **Docker:** Same as stdio? Or different loading behavior?
- **HTTP/SSE:** Would remote MCPs defer schema loading differently?
- **Plugin-bundled MCPs:** Can `.mcp.json` inside a plugin dir defer loading until plugin is activated?
- **Lazy MCP registration:** Is there a Claude Code API or config to register an MCP but not load schemas until a skill requests it?

---

## Theoretical Optimal Target

If we could defer MCP schemas until actually needed:

| Category | Current | Optimal | Savings |
|----------|---------|---------|---------|
| MCP tools | 11,300 | ~500 (tool search stub) | 10,800 |
| Skills | 20,400 | 20,400 (already optimal) | 0 |
| Everything else | 3,700 | 3,700 | 0 |
| **Total (excl. buffer)** | **35,400** | **24,600** | **10,800** |
| **Free space** | **132k (66%)** | **142k (71%)** | **+10k** |

The gap between current (18%) and theoretical optimal (~12%) is entirely the MCP preloading question.

---

## Test History

| Test | What | Skills | MCPs | Total | Free |
|------|------|--------|------|-------|------|
| Baseline (79 skills, pre-dedup) | Fresh session | 15.0k | 11.3k | 33k | 134k (67%) |
| With ENABLE_TOOL_SEARCH (first check) | Before interaction | 15.0k | 5.7k | 27k | 140k (70%) |
| After interaction | Tool Search filled back | 15.0k | 11.3k | 33k | 134k (67%) |
| After dedup (79 skills) | Removed project copies | 13.7k | 11.3k | 33k | 134k (67%) |
| Full system (196 skills) | All skills synced | 20.4k | 11.3k | 35k | 132k (66%) |
| Drizzle auto-invocation | Skills unchanged | 20.4k | 11.3k | — | — |
