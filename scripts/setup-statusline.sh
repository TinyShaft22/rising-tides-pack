#!/bin/bash
# Setup Claude Code status line
# Shows: Model | Progress Bar | Context % | Branch | Repo

set -e

echo "Setting up Claude Code status line..."

# Create .claude directory if it doesn't exist
mkdir -p ~/.claude

# Create the statusline script
cat > ~/.claude/statusline.sh << 'STATUSLINE'
#!/bin/bash
# Claude Code Status Line
# Reads JSON input and outputs formatted status

read -r JSON

# Parse JSON values
MODEL=$(echo "$JSON" | jq -r '.model // "unknown"' 2>/dev/null | sed 's/claude-//' | cut -d'-' -f1-2)
USED=$(echo "$JSON" | jq -r '.context_window.used_percentage // 0' 2>/dev/null | cut -d. -f1)
TOTAL=$(echo "$JSON" | jq -r '.context_window.total_input_tokens // 0' 2>/dev/null)

# Git info
BRANCH=$(git branch --show-current 2>/dev/null || echo "no-git")
REPO=$(basename "$(pwd)" 2>/dev/null || echo "unknown")

# Create progress bar
BAR_WIDTH=20
FILLED=$((USED * BAR_WIDTH / 100))
EMPTY=$((BAR_WIDTH - FILLED))

# Build progress bar string
BAR=""
for ((i=0; i<FILLED; i++)); do BAR="${BAR}#"; done
for ((i=0; i<EMPTY; i++)); do BAR="${BAR}-"; done

# Format token count
if [ "$TOTAL" -gt 1000000 ]; then
  TOKENS="$(echo "scale=1; $TOTAL/1000000" | bc 2>/dev/null || echo "$TOTAL")M"
elif [ "$TOTAL" -gt 1000 ]; then
  TOKENS="$(echo "scale=1; $TOTAL/1000" | bc 2>/dev/null || echo "$TOTAL")k"
else
  TOKENS="$TOTAL"
fi

# Output formatted status line
echo "$MODEL | [$BAR] $USED% | $TOKENS | $BRANCH | $REPO"
STATUSLINE

chmod +x ~/.claude/statusline.sh

# Update settings.json
SETTINGS_FILE=~/.claude/settings.json

if [ -f "$SETTINGS_FILE" ]; then
  # Backup existing settings
  cp "$SETTINGS_FILE" "$SETTINGS_FILE.bak"

  # Add or update statusLine setting
  if command -v jq &> /dev/null; then
    jq '. + {"statusLine": {"type": "command", "command": "~/.claude/statusline.sh"}}' "$SETTINGS_FILE" > "$SETTINGS_FILE.tmp" && mv "$SETTINGS_FILE.tmp" "$SETTINGS_FILE"
  else
    echo "Warning: jq not installed. Please add statusLine config manually."
    echo ""
    echo "Add this to ~/.claude/settings.json:"
    echo '  "statusLine": {"type": "command", "command": "~/.claude/statusline.sh"}'
  fi
else
  # Create new settings file
  mkdir -p ~/.claude
  echo '{"statusLine": {"type": "command", "command": "~/.claude/statusline.sh"}}' > "$SETTINGS_FILE"
fi

echo ""
echo "Status line configured!"
echo ""
echo "The status line will show:"
echo "  Model | [Progress Bar] Context% | Tokens | Branch | Repo"
echo ""
echo "Example:"
echo "  opus-4 | [########------------] 40% | 80k | main | my-project"
echo ""
echo "Restart Claude Code to see the status line."
