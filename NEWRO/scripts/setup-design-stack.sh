#!/usr/bin/env bash
# Installs the pinned design skills into $SKILLS_DIR (default ~/.claude/skills)
# and clones reference repos into $REFS_DIR (default ~/design-refs).
# Usage: scripts/setup-design-stack.sh [--no-refs]
set -euo pipefail
export GIT_TERMINAL_PROMPT=0
HERE="$(cd "$(dirname "$0")/.." && pwd)"
SKILLS_DIR="${SKILLS_DIR:-$HOME/.claude/skills}"
REFS_DIR="${REFS_DIR:-$HOME/design-refs}"
mkdir -p "$SKILLS_DIR" "$REFS_DIR"

fetch() { # repo sha -> $REFS_DIR/<name>
  local repo="$1" sha="$2" dir="$REFS_DIR/$(echo "$1" | tr / _)"
  if [ ! -d "$dir/.git" ]; then
    git clone --quiet --filter=blob:none --no-checkout "https://github.com/$repo.git" "$dir"
  fi
  git -C "$dir" fetch --quiet --depth 1 origin "$sha" 2>/dev/null || git -C "$dir" fetch --quiet origin
  git -C "$dir" checkout --quiet "$sha"
}

while read -r repo sha _; do
  [[ -z "$repo" || "$repo" == \#* ]] && continue
  fetch "$repo" "$sha" &
done < "$HERE/design-stack.lock"
wait

r() { echo "$REFS_DIR/$1"; }
put() { rm -rf "$SKILLS_DIR/$2"; cp -r "$1" "$SKILLS_DIR/$2"; echo "installed $2"; }

put "$(r pbakaus_impeccable)/.claude/skills/impeccable" impeccable
put "$(r heydamir_unslop)/skills/unslop" unslop
put "$(r Nutlope_hallmark)/skills/hallmark" hallmark
put "$(r leonxlnx_taste-skill)/skills/taste-skill" taste-skill
put "$(r emilkowalski_skills)/skills/emil-design-eng" emil-design-eng
put "$(r nextlevelbuilder_ui-ux-pro-max-skill)/.claude/skills/ui-ux-pro-max" ui-ux-pro-max
put "$(r nextlevelbuilder_ui-ux-pro-max-skill)/.claude/skills/design-system" uupm-design-system
put "$(r GoogleChrome_modern-web-guidance)/skills/modern-web-guidance" modern-web-guidance
put "$(r shadcn-ui_ui)/skills/shadcn" shadcn-ui
put "$(r vercel-labs_agent-skills)/skills/web-design-guidelines" web-design-guidelines
put "$(r vercel-labs_agent-skills)/skills/react-best-practices" vercel-react-best-practices
put "$(r anthropics_skills)/skills/frontend-design" anthropic-frontend-design
echo "Done. Reference repos (react-bits, motion-primitives, astryx, open-design) are in $REFS_DIR"
