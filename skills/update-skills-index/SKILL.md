# Skill: Update Skills Index

Scan the global skills folder and update SKILLS_INDEX.md with any new skills.

## Trigger

Invoke when user says:
- "update skills index"
- "refresh skills index"
- "I added new skills"
- "sync skills index"

## Workflow

### Step 1: Scan Global Skills Folder

List all skills in the global folder:
```bash
ls -1 ~/.claude/skills/
```

### Step 2: Read Current Index

Read the existing index:
```
~/.claude/SKILLS_INDEX.md
```

### Step 3: Identify New Skills

Compare the folder contents to what's documented in the index. Identify:
- Skills in folder but NOT in index (new)
- Skills in index but NOT in folder (removed)

### Step 4: For Each New Skill

Read the skill's SKILL.md file to understand:
- What it does
- When to use it
- What category it belongs to

```bash
cat ~/.claude/skills/[skill-name]/SKILL.md
```

### Step 5: Update the Index

Add new skills to:
1. The **Master Skill Checklist** section (with checkbox)
2. The appropriate **Category** section (with invoke command and use case)
3. Update the **Total Skills Installed** count

### Step 6: Report Changes

Show the user:
- How many new skills were added
- How many skills were removed
- The updated total count

## Important

- Always preserve existing skill entries (don't overwrite)
- Categorize new skills based on their SKILL.md content
- If unsure of category, ask the user
- Update the "Last Updated" date

## File Locations

- Global skills folder: `~/.claude/skills/`
- Index file: `~/.claude/SKILLS_INDEX.md`
