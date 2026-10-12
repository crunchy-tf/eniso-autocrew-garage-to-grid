# Autocrew: Garage to Grid — Git reference

## The model

Git records snapshots and their relationships. GitHub hosts repositories and collaboration.
Working files → `git add` → index (staging) → `git commit` → saved commit.
A branch is a movable reference to a commit. HEAD normally identifies the current branch.
Saved commits are immutable. A merge can record two parents.
A local commit is not shared until pushed. A PR reviews pushed work, not working edits.

## Inspect your project

```sh
pwd
ls
cd garage-to-grid
cat README.md
git help status
git status
git diff
git diff --staged
```

## Begin and record

```sh
git init -b main
git add .
git commit -m "Save prototype baseline"
git add lighting.cfg
git commit -m "Enable headlights"
```

`add` captures the content at that moment. Later working edits require another add.
Use `.gitignore` for matching untracked generated files (e.g. `*.log`).
Ignore rules do not remove already tracked files or earlier history.

## History and recovery

```sh
git log --oneline --graph --all --decorate
git show HEAD
git show <commit-id>:steering.cfg
git restore --source <good-commit-id> -- steering.cfg
git restore steering.cfg
git restore --staged steering.cfg
git revert <bad-commit-id>
```

A normal restore replaces working content from the index; inspect first because working edits may be discarded.
`restore --staged` resets selected index content from HEAD while keeping working edits.
A revert creates a corrective commit while keeping prior history. The workshop supports clean single-parent reversals.

## Branch and merge

```sh
git branch
git branch cockpit-display
git switch cockpit-display
# Or create and switch together:
git switch -c cockpit-display
git add dashboard.cfg
git commit -m "Enable cockpit instruments"
git switch main
git merge cockpit-display
```

Fast-forward integration advances a reference. Diverged paths use a shared ancestor.
For a conflict: read both changes, choose content according to requirements, remove markers,
then `git add <file>` and `git commit -m "Explain the resolution"`.
`git merge --abort` restores the pre-merge state in this workshop.

## Remote collaboration

```sh
git clone <real-repository-url>
cd <cloned-folder>
git remote -v
git fetch origin
git merge origin/pit-crew
git push -u origin <working-branch>
# Open, inspect, review and merge a pull request on GitHub.
git switch main
git pull --ff-only origin main
```

Fetch updates your remote-tracking references without editing working files.
Push shares saved commits. `-u` establishes upstream correspondence.
Fast-forward-only pull refuses divergent integration and preserves your current work.
GitHub forks are hosted copies; clones are local working copies.
Issues describe work; pull requests propose reviewed changes. PRs are not Git commands.

## Real lab setup (outside the simulator)

```sh
git --version
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
git remote add origin <your-actual-repository-url>
```

Replace placeholders. Prepare your own GitHub authentication before the real lab.
The workshop's `workshop-demo` clone URL is illustrative and works only in its simulator.
Create an empty GitHub repository without a README for an independently initialized starter.
Push main, then push a feature branch and open a PR. Merge remotely and synchronize local main.

## Explore later

`stash`: temporarily put edits aside. `tag`: name a release. `blame`: inspect line history.
`bisect`: find a regression. `reflog`: find earlier reference positions.
`rebase`, `reset`, and `commit --amend` can rewrite history: understand their effects before using them on shared work.
These advanced operations are reference topics, not implemented terminal commands here.

## Sources

- MIT: https://missing.csail.mit.edu/2026/version-control/
- Official Git reference: https://git-scm.com/docs
- Git history: https://git-scm.com/book/en/v2/Getting-Started-A-Short-History-of-Git
- GitHub Flow: https://docs.github.com/en/get-started/using-github/github-flow
- GitHub authentication: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/about-authentication-to-github

Workshop by Ayoub Dhaouadi for ENISO Autocrew.

## Alternative terminal workflows

The suggested commands are examples. Missions check the saved files, branches, integrated history, conflict resolution and reviewed release; equivalent valid workflows count.

- Staging: `git add .`, `git add *`, `git add *.cfg`, `git add -A`, `git add -u`, individual paths. `*` expands visible filenames; `.` includes hidden files and respects ignore rules. Explicitly expanded ignored files cause an error, as in real Git; use `-f` only when intentional.
- Saving: `git commit -m "Repair"`, `git commit --message="Repair"`, `git commit -am "Repair"` (tracked files only).
- Branches: `git switch -c feature/dashboard` or `git checkout -b feature/dashboard`; `switch` or `checkout` to return.
- Recovery: `git restore --source=HEAD~1 -- steering.cfg`, `git checkout HEAD^ -- steering.cfg`, a corrective `git revert HEAD`, or edit the file from the historical clue. Checkout with an explicit commit updates the index too.
- Unstage: `git restore --staged file` or `git reset HEAD -- file`.
- Integration: `fetch` plus `merge`, or `git pull origin pit-crew`; `--ff-only` refuses divergence. `git merge --no-ff feature/dashboard` records two parents.
- Conflict resolution: edit the file, `git checkout --ours -- tyres.cfg`, or `git restore --ours tyres.cfg`, then stage and commit.
- Sharing: `git push -u origin HEAD`, then `git push` once the upstream is configured.
- Shell: `echo headlights=on > lighting.cfg`, `printf '%s\n' compound=wet > tyres.cfg`, `>>` appends, `touch`, `rm`, `cat`, `ls -a`, `&&` and `;`. These affect only workshop files.

This remains a virtual workshop terminal, not a full operating-system shell or a connection to a real GitHub account. Unsupported operations report their limits explicitly.
