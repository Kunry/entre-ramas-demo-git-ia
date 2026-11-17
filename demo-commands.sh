#!/usr/bin/env bash
set -euo pipefail

mkdir -p demo-git-github
cd demo-git-github
git init

echo "# Demo Git y GitHub" > README.md
git add README.md
git commit -m "Crear README inicial"

git switch -c mejora-readme
echo "
## Objetivo
Practicar Git con IA sin romper main." >> README.md
git status
git diff

git add README.md
git commit -m "Añadir objetivo del proyecto"
