# Quickstart: Get Running in 5 Minutes

This guide gets you from zero to using skills as fast as possible.

---

## Prerequisites

- Claude Code CLI installed (`claude` command works)
- Basic familiarity with terminal commands

### Recommended CLI Tools

These CLIs enhance specific skills. Install them as needed:

| CLI | Install | Used By |
|-----|---------|---------|
| `gh` | `brew install gh` | github-workflow |
| `stripe` | `brew install stripe/stripe-cli/stripe` | stripe-integration |
| `supabase` | `brew install supabase/tap/supabase` | supabase-guide |
| `vercel` | `npm install -g vercel` | vercel-deployment |
| `firebase` | `npm install -g firebase-tools` | firebase-guide |
| `netlify` | `npm install -g netlify-cli` | netlify-deployment |
| `gcloud` | `brew install google-cloud-sdk` | google-cloud-setup |
| `jq` | `brew install jq` | Status line (optional) |

---

## Step 1: Copy Skills (1 minute)

```bash
# Create the global skills directory
mkdir -p ~/.claude/skills

# Clone or download this repo, then:
cp -r skills/* ~/.claude/skills/
cp SKILLS_INDEX.md MCP_REGISTRY.md ATTRIBUTION.md ~/.claude/
```

**Done.** Skills are now available globally.

---

## Step 2: Verify Installation (30 seconds)

```bash
# Check skills are there
ls ~/.claude/skills/ | head -10

# Should see folders like:
# ab-test-setup
# agent-md-refactor
# analytics-tracking
# ...
```

---

## Step 3: Try a Skill (1 minute)

Open any project and run:

```
/recommend-skills
```

Claude will:
1. Analyze your project
2. Suggest relevant skills
3. Show you how to use them

---

## Step 4: Set Up Memory (Optional, 2 minutes)

For persistent context across sessions:

```bash
# Add memory MCP globally
claude mcp add memory --scope user
```

When prompted, set the memory file path to your Desktop:
- **Windows (WSL):** `/mnt/c/Users/YOUR_NAME/Desktop/claude-memory.jsonl`
- **Mac:** `/Users/YOUR_NAME/Desktop/claude-memory.jsonl`
- **Linux:** `/home/YOUR_NAME/Desktop/claude-memory.jsonl`

**Why Desktop?** The memory file is human-readable JSON. Keeping it visible reminds you what Claude knows about you.

---

## Step 5: Use Plugins (Optional)

For MCP-dependent skills, use plugins instead of manual MCP setup:

```bash
# Copy plugins to your project
cp -r plugins/ /path/to/your/project/

# Start Claude with a plugin
claude --plugin-dir ./plugins/react-dev-plugin
```

Plugins bundle the skill + MCP together - no separate configuration needed.

---

## Step 6: Set Up Status Line (Optional, 1 minute)

Add a status line showing model, context usage, and git branch:

```bash
# Run the setup script
./scripts/setup-statusline.sh
```

Or configure manually with:
```
/statusline show model name, context percentage as progress bar, git branch, and folder name
```

The status line shows:
```
opus-4 | [########------------] 40% | 80k | main | my-project
```

---

## What's Next?

### Browse Available Skills

Open `SKILLS_INDEX.md` to see all 95 skills organized by category.

### Common Skill Commands

| Command | What It Does |
|---------|--------------|
| `/recommend-skills` | Get suggestions for current project |
| `/react-dev` | React development guidance |
| `/copywriting` | Marketing copy assistance |
| `/seo-audit` | SEO analysis |
| `/mermaid` | Create diagrams |
| `/context7` | Pull library documentation |

### Project-Specific Skills

Import skills to individual projects:

```bash
# Create project skills folder
mkdir -p .claude/skills

# Copy specific skills
cp -r ~/.claude/skills/react-dev .claude/skills/
cp -r ~/.claude/skills/webapp-testing .claude/skills/
```

### Configure MCPs Per-Project

Instead of global MCPs, create `.mcp.json` in your project root:

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

See `MCP_REGISTRY.md` for all available MCP configurations.

---

## Troubleshooting

### Skills Not Loading

1. Check the path: `ls ~/.claude/skills/`
2. Each skill needs a `SKILL.md` file inside its folder
3. Restart Claude Code after adding skills

### MCP Not Working

1. Check config syntax: `claude mcp list`
2. Test the npx command directly in terminal
3. Restart Claude Code after config changes

### Need More Help

- `MCP_REGISTRY.md` - MCP troubleshooting
- `docs/PLUGIN-GUIDE.md` - Plugin details
- `docs/MCP-SETUP-GUIDE.md` - Full MCP setup

---

## Summary

| Step | Command | Time |
|------|---------|------|
| 1. Copy skills | `cp -r skills/* ~/.claude/skills/` | 1 min |
| 2. Verify | `ls ~/.claude/skills/` | 30 sec |
| 3. Try it | `/recommend-skills` | 1 min |
| 4. Memory (opt) | `claude mcp add memory --scope user` | 2 min |
| 5. Plugins (opt) | `claude --plugin-dir ./plugins/[name]` | 1 min |
| 6. Status line (opt) | `./scripts/setup-statusline.sh` | 1 min |

**Total: ~5-7 minutes to full setup**
