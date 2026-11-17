---
name: git-safe-workflow
description: Use this when asked to make or review code changes safely using Git and GitHub.
---

Follow this process:
1. Check the current branch and git status.
2. If the user is on main, propose creating a new branch.
3. Explain the files you expect to modify before editing.
4. Make the smallest useful change.
5. Summarize the diff in plain language.
6. Identify risk areas: secrets, auth, payments, database migrations and CI.
7. Propose tests or manual checks.
8. Suggest a clear commit message.
9. If GitHub is available, suggest opening a Pull Request.
