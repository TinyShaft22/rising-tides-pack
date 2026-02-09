#!/usr/bin/env python3
"""
Sync SKILLS_INDEX.json with actual skill frontmatter.

This script:
1. Reads each skill's SKILL.md frontmatter
2. Extracts triggers and description
3. Updates SKILLS_INDEX.json with synced data
4. Fixes category misalignments

Run from repo root:
    python github/scripts/sync-index.py
"""

import json
import os
import re
from pathlib import Path
from typing import Any

# Category corrections - skills that are miscategorized in the index
CATEGORY_CORRECTIONS = {
    # Language skills should be in "languages" category
    "python-pro": "languages",
    "javascript-pro": "languages",
    "typescript-pro": "languages",
    "cpp-pro": "languages",
    "rust-engineer": "languages",
    "golang-pro": "languages",
    "java-architect": "languages",
    "kotlin-specialist": "languages",
    "php-pro": "languages",
    "csharp-developer": "languages",
    "swift-expert": "languages",
    "sql-pro": "languages",
    # Framework experts
    "django-expert": "backend",
    "fastapi-expert": "backend",
    "flask-expert": "backend",
    "rails-expert": "backend",
    "laravel-specialist": "backend",
    "spring-boot-engineer": "backend",
    "nestjs-expert": "backend",
    "dotnet-core-expert": "backend",
    # Frontend frameworks
    "react-dev": "frontend",
    "vue-expert": "frontend",
    "angular-architect": "frontend",
    "svelte-expert": "frontend",
    # Mobile
    "flutter-expert": "mobile",
    "react-native-expert": "mobile",
    # DevOps
    "devops-engineer": "devops",
    "kubernetes-specialist": "devops",
    "docker-management": "devops",
    "terraform-engineer": "devops",
    "cicd-pipelines": "devops",
}


def parse_frontmatter(content: str) -> dict[str, Any]:
    """Extract YAML frontmatter from markdown content."""
    # Match content between --- markers
    match = re.match(r'^---\s*\n(.*?)\n---', content, re.DOTALL)
    if not match:
        return {}

    frontmatter_text = match.group(1)
    result = {}

    # Parse simple key: value pairs
    current_key = None
    current_list = []

    for line in frontmatter_text.split('\n'):
        # Check for list item
        list_match = re.match(r'^\s+-\s+(.+)$', line)
        if list_match and current_key:
            current_list.append(list_match.group(1).strip())
            continue

        # Check for key: value
        kv_match = re.match(r'^(\w[\w-]*)\s*:\s*(.*)$', line)
        if kv_match:
            # Save previous list if any
            if current_key and current_list:
                result[current_key] = current_list
                current_list = []

            key = kv_match.group(1)
            value = kv_match.group(2).strip()

            if value:
                # Remove quotes if present
                if value.startswith('"') and value.endswith('"'):
                    value = value[1:-1]
                elif value.startswith("'") and value.endswith("'"):
                    value = value[1:-1]
                result[key] = value
                current_key = None
            else:
                # Could be start of a list
                current_key = key

    # Don't forget last list
    if current_key and current_list:
        result[current_key] = current_list

    return result


def find_skill_files(github_dir: Path) -> dict[str, Path]:
    """Find all SKILL.md files and map skill_id -> path."""
    skills = {}

    # Skills in github/skills/
    skills_dir = github_dir / "skills"
    if skills_dir.exists():
        for skill_folder in skills_dir.iterdir():
            if skill_folder.is_dir():
                skill_file = skill_folder / "SKILL.md"
                if skill_file.exists():
                    skills[skill_folder.name] = skill_file

    # Skills in github/plugins/*/skills/*/
    plugins_dir = github_dir / "plugins"
    if plugins_dir.exists():
        for plugin_folder in plugins_dir.iterdir():
            if plugin_folder.is_dir():
                plugin_skills = plugin_folder / "skills"
                if plugin_skills.exists():
                    for skill_folder in plugin_skills.iterdir():
                        if skill_folder.is_dir():
                            skill_file = skill_folder / "SKILL.md"
                            if skill_file.exists():
                                skills[skill_folder.name] = skill_file

    return skills


def sync_index(github_dir: Path, dry_run: bool = False) -> dict:
    """Sync SKILLS_INDEX.json with skill frontmatter."""
    index_path = github_dir / "SKILLS_INDEX.json"

    # Load current index
    with open(index_path, 'r', encoding='utf-8') as f:
        index = json.load(f)

    # Find all skill files
    skill_files = find_skill_files(github_dir)

    stats = {
        "skills_found": len(skill_files),
        "triggers_updated": 0,
        "descriptions_added": 0,
        "categories_fixed": 0,
        "skills_not_in_index": [],
        "index_skills_not_on_disk": [],
    }

    # Create a map of skill id -> index entry for quick lookup
    index_skills = {s["id"]: s for s in index["skills"]}

    # Track which index skills we've seen
    seen_skills = set()

    for skill_id, skill_path in skill_files.items():
        seen_skills.add(skill_id)

        # Read and parse frontmatter
        with open(skill_path, 'r', encoding='utf-8') as f:
            content = f.read()

        frontmatter = parse_frontmatter(content)

        if skill_id not in index_skills:
            stats["skills_not_in_index"].append(skill_id)
            continue

        entry = index_skills[skill_id]

        # Sync description
        if "description" in frontmatter:
            if "description" not in entry or entry.get("description") != frontmatter["description"]:
                entry["description"] = frontmatter["description"]
                stats["descriptions_added"] += 1

        # Sync triggers (only if frontmatter has triggers)
        if "triggers" in frontmatter and isinstance(frontmatter["triggers"], list):
            if entry.get("triggers") != frontmatter["triggers"]:
                entry["triggers"] = frontmatter["triggers"]
                stats["triggers_updated"] += 1

        # Fix categories
        if skill_id in CATEGORY_CORRECTIONS:
            correct_category = CATEGORY_CORRECTIONS[skill_id]
            if entry.get("category") != correct_category:
                entry["category"] = correct_category
                stats["categories_fixed"] += 1

    # Find index skills not on disk
    for skill_id in index_skills:
        if skill_id not in seen_skills:
            stats["index_skills_not_on_disk"].append(skill_id)

    # Update meta timestamp
    from datetime import date
    index["meta"]["lastUpdated"] = date.today().isoformat()

    if not dry_run:
        # Write updated index
        with open(index_path, 'w', encoding='utf-8') as f:
            json.dump(index, f, indent=2, ensure_ascii=False)
            f.write('\n')  # Trailing newline

    return stats


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Sync SKILLS_INDEX.json with skill frontmatter")
    parser.add_argument("--dry-run", action="store_true", help="Show what would change without writing")
    parser.add_argument("--github-dir", type=Path, default=None, help="Path to github/ directory")
    args = parser.parse_args()

    # Find github dir
    if args.github_dir:
        github_dir = args.github_dir
    else:
        # Try relative to script location
        script_dir = Path(__file__).parent
        github_dir = script_dir.parent
        if not (github_dir / "SKILLS_INDEX.json").exists():
            # Try from current directory
            github_dir = Path("github")

    if not (github_dir / "SKILLS_INDEX.json").exists():
        print(f"Error: Cannot find SKILLS_INDEX.json in {github_dir}")
        return 1

    print(f"Syncing index from: {github_dir}")
    print(f"Dry run: {args.dry_run}")
    print()

    stats = sync_index(github_dir, dry_run=args.dry_run)

    print("=== Sync Results ===")
    print(f"Skills found on disk: {stats['skills_found']}")
    print(f"Triggers updated: {stats['triggers_updated']}")
    print(f"Descriptions added: {stats['descriptions_added']}")
    print(f"Categories fixed: {stats['categories_fixed']}")

    if stats["skills_not_in_index"]:
        print(f"\nSkills on disk but NOT in index ({len(stats['skills_not_in_index'])}):")
        for s in sorted(stats["skills_not_in_index"]):
            print(f"  - {s}")

    if stats["index_skills_not_on_disk"]:
        print(f"\nSkills in index but NOT on disk ({len(stats['index_skills_not_on_disk'])}):")
        for s in sorted(stats["index_skills_not_on_disk"]):
            print(f"  - {s}")

    if args.dry_run:
        print("\n[DRY RUN - no changes written]")
    else:
        print("\n[Index updated successfully]")

    return 0


if __name__ == "__main__":
    exit(main())
