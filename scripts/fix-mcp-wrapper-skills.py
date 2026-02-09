#!/usr/bin/env python3
"""
Fix MCP wrapper plugins by:
1. Adding their skills to the skills array
2. Updating plugin entries to reference the skills
"""

import json
from pathlib import Path

def main():
    github_dir = Path(__file__).parent.parent
    index_path = github_dir / "SKILLS_INDEX.json"

    with open(index_path, 'r', encoding='utf-8') as f:
        index = json.load(f)

    # New skill entries to add
    new_skills = [
        {
            "id": "context7",
            "name": "Context7",
            "category": "integrations",
            "triggers": [
                "get docs",
                "fetch documentation",
                "library docs",
                "context7",
                "live documentation"
            ],
            "description": "Pull live, up-to-date documentation for any library or framework. Use when you need current API references, before generating code for unfamiliar libraries, or when explicitly asked for docs.",
            "cli": None,
            "mcp": "context7",
            "plugin": "context7-plugin",
            "source": "nickmohler"
        },
        {
            "id": "playwright",
            "name": "Playwright",
            "category": "testing",
            "triggers": [
                "browser automation",
                "E2E testing",
                "playwright",
                "screenshot",
                "automate browser"
            ],
            "description": "Browser automation for testing and web interaction. Use for E2E testing, screenshot capture, form filling, and automated browser workflows.",
            "cli": None,
            "mcp": "playwright",
            "plugin": "playwright-plugin",
            "source": "nickmohler"
        },
        {
            "id": "remotion",
            "name": "Remotion",
            "category": "design",
            "triggers": [
                "create video",
                "video generation",
                "remotion",
                "programmatic video",
                "video from React"
            ],
            "description": "Create videos programmatically using React components. Use for YouTube intros, product demos, social clips, and animated content.",
            "cli": None,
            "mcp": "remotion",
            "plugin": "remotion-plugin",
            "source": "nickmohler"
        },
        {
            "id": "memory-graph",
            "name": "Memory Graph",
            "category": "utilities",
            "triggers": [
                "remember",
                "memory",
                "knowledge graph",
                "persistent memory",
                "recall"
            ],
            "description": "Persistent knowledge graph for storing entities, relations, and observations across sessions. Use for explicit memory management, querying stored knowledge, or manual memory operations.",
            "cli": None,
            "mcp": "memory",
            "plugin": "memory-plugin",
            "source": "nickmohler"
        }
    ]

    # Check which skills already exist
    existing_ids = {s["id"] for s in index["skills"]}

    added = []
    for skill in new_skills:
        if skill["id"] not in existing_ids:
            index["skills"].append(skill)
            added.append(skill["id"])

    # Update plugin entries to reference skills
    plugin_skill_mapping = {
        "context7-plugin": "context7",
        "playwright-plugin": "playwright",
        "remotion-plugin": "remotion",
        "memory-plugin": "memory-graph"
    }

    updated_plugins = []
    for plugin in index["plugins"]:
        if plugin["id"] in plugin_skill_mapping:
            new_skill = plugin_skill_mapping[plugin["id"]]
            if plugin.get("skill") != new_skill:
                plugin["skill"] = new_skill
                updated_plugins.append(plugin["id"])

    # Write updated index
    with open(index_path, 'w', encoding='utf-8') as f:
        json.dump(index, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"Skills added: {added}")
    print(f"Plugins updated: {updated_plugins}")
    print(f"Total skills now: {len(index['skills'])}")

if __name__ == "__main__":
    main()
