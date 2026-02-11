# Context Efficiency Report — Rising Tides Skills Pack

**Date:** 2026-02-01
**Status:** VERIFIED — Full test suite completed
**Test Environment:** WSL2, Claude Code v2.1.29 with Opus 4.5, 200k context window
**Test Project:** TESTING (minimal project, no git)

---

## Verified Test Results (2026-02-01)

### Tool Search Impact (The Key Finding)

| Test | Tool Search | Project MCPs | MCP Tokens | Total Baseline | % |
|------|------------|-------------|------------|----------------|---|
| Zero MCPs | true | none | 0 | 24k | 12% |
| Context7 only | true | context7 | 0 | 24k | 12% |
| All 3 MCPs | true | context7, playwright, github | 0 | 24k | 12% |
| All 3 MCPs | **false** | context7, playwright, github | **11.3k** | **35k** | **18%** |
| Zero project MCPs | **false** | none (plugin MCPs only) | **6.9k** | **31k** | **15%** |

**Tool Search eliminates 11.3k tokens of MCP overhead.** With `ENABLE_TOOL_SEARCH=true`, baseline is a flat 24k/12% regardless of how many MCPs are configured.

### Baseline Breakdown (Tool Search ON — recommended config)

| Category | Tokens | % of 200k | Source |
|----------|--------|-----------|--------|
| System prompt | 3,100 | 1.6% | Claude Code (fixed) |
| MCP tools | 0 | 0% | Deferred by Tool Search |
| Custom agents | 531 | 0.3% | 11 GSD agents |
| Skills | 20,400 | 10.2% | 196 skill frontmatters |
| Plugin | 68 | 0.0% | frontend-design |
| Autocompact buffer | 33,000 | 16.5% | Claude Code (fixed) |
| **Total baseline** | **~24,000** | **12%** | |
| **Free for work** | **~143,000** | **71.5%** | |

### Baseline Breakdown (Tool Search OFF — legacy)

| Category | Tokens | % of 200k | Source |
|----------|--------|-----------|--------|
| System prompt | 3,100 | 1.6% | Claude Code (fixed) |
| MCP tools | 11,300 | 5.7% | 49 tools from 4 MCPs (all preloaded) |
| Custom agents | 531 | 0.3% | 11 GSD agents |
| Skills | 20,400 | 10.2% | 196 skill frontmatters |
| Plugin | 68 | 0.0% | frontend-design |
| Autocompact buffer | 33,000 | 16.5% | Claude Code (fixed) |
| **Total baseline** | **~35,000** | **18%** | |
| **Free for work** | **~132,000** | **66%** | |

### Scaling Comparison

| Configuration | Skills Cost | Total Baseline | Free Space |
|--------------|-------------|----------------|------------|
| 79 skills (original, Tool Search OFF) | 13.7k | 33k (16%) | 134k (67%) |
| 196 skills (Tool Search OFF) | 20.4k | 35k (18%) | 132k (66%) |
| 196 skills (Tool Search ON) | 20.4k | 24k (12%) | 143k (71.5%) |
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

## What We Know Works (Verified)

1. **Progressive disclosure for skills:** Only frontmatter loads at startup (~104 tokens/skill). Full SKILL.md content does NOT load on auto-invocation — only on explicit `/skill-name`.
2. **Skill scaling is cheap:** 79→196 skills added only 6.7k tokens. Adding skills costs ~57 tokens each.
3. **No duplicate loading** (after fix): Removing project-level copies of user-level skills eliminated ~1.3k wasted tokens.
4. **`ENABLE_TOOL_SEARCH=true` fully defers MCP schemas.** With Tool Search on, MCP tools show as "loaded on-demand" and consume 0 context tokens at startup. This is the recommended config.
5. **Tool Search auto mode has a known bug.** Use `ENABLE_TOOL_SEARCH=true` explicitly, not `auto`. Auto mode sometimes fails to trigger even when tools exceed 10% of context.
6. **Transport type doesn't matter.** stdio, HTTP/SSE, streamable HTTP all load schemas at init. Tool Search is the only deferral mechanism.
7. **Plugins don't hide MCP context.** Plugin `.mcp.json` loads MCP servers at session init, same as project `.mcp.json`. Plugins are a distribution mechanism, not a context optimization. Tool Search is what defers schemas.

## Previously Open Questions — Now Answered

| Question | Answer |
|----------|--------|
| Can MCPs be bundled in plugins to defer schema loading? | **No.** Plugin MCPs load immediately when enabled. |
| Does transport type affect schema loading? | **No.** All transports load at init. |
| Can MCPs be registered lazily (server not started)? | **No.** Open feature requests exist but not implemented. |
| Does `--plugin-dir` defer MCP loading? | **No.** It either loads immediately or fails due to bugs ([#15308](https://github.com/anthropics/claude-code/issues/15308)). |
| What defers MCP schemas? | **Only Tool Search** (`ENABLE_TOOL_SEARCH=true`). |
| Does the SKILLS_INDEX.json affect MCP loading? | **No.** Index is for skill discovery only. |

## Achieved Target

With `ENABLE_TOOL_SEARCH=true`, the "theoretical optimal" from the previous report is now the actual baseline:

| Category | Previous (TS off) | Current (TS on) | Savings |
|----------|-------------------|-----------------|---------|
| MCP tools | 11,300 | 0 | 11,300 |
| Skills | 20,400 | 20,400 | 0 |
| Everything else | 3,700 | 3,700 | 0 |
| **Total (excl. buffer)** | **35,400** | **24,100** | **11,300** |
| **Free space** | **132k (66%)** | **143k (71.5%)** | **+11k** |

---

## Full Test History

| Test | What | Tool Search | Skills | MCPs | Total | Free |
|------|------|-------------|--------|------|-------|------|
| Baseline (79 skills, pre-dedup) | Fresh session | off | 15.0k | 11.3k | 33k | 134k (67%) |
| With ENABLE_TOOL_SEARCH=true | Before interaction | auto | 15.0k | 5.7k | 27k | 140k (70%) |
| After interaction | Tool Search filled back | auto | 15.0k | 11.3k | 33k | 134k (67%) |
| After dedup (79 skills) | Removed project copies | off | 13.7k | 11.3k | 33k | 134k (67%) |
| Full system (196 skills) | All skills synced | off | 20.4k | 11.3k | 35k | 132k (66%) |
| **Zero MCPs** | **No project .mcp.json** | **true** | **20.4k** | **0** | **24k** | **143k (71.5%)** |
| **Context7 only** | **1 MCP configured** | **true** | **20.4k** | **0** | **24k** | **143k (71.5%)** |
| **All 3 MCPs** | **context7+playwright+github** | **true** | **20.4k** | **0** | **24k** | **143k (71.5%)** |
| **All 3 MCPs** | **context7+playwright+github** | **false** | **20.4k** | **11.3k** | **35k** | **132k (66%)** |
| **Zero project MCPs** | **Plugin MCPs only** | **false** | **20.4k** | **6.9k** | **31k** | **136k (68%)** |
| **On-demand test** | **Playwright skill, no MCP** | **true** | **20.4k** | **0** | **29k*** | **135k*** |

*Includes conversation tokens from skill invocation and exploration
