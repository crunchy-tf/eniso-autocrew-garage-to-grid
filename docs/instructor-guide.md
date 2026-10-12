# Autocrew: Garage to Grid — instructor runbook

Public student website: https://autocrew-garage-to-grid-20261012.ayoubdhaouadi08.chatgpt.site

Presenter launch: https://autocrew-garage-to-grid-20261012.ayoubdhaouadi08.chatgpt.site/?mode=presenter#/welcome

Instructor: Ayoub Dhaouadi — Software Engineer; M2 Research Master’s Student at ENIT, Signals, Systems and Data.

## Before students arrive

1. Open the public link in your presentation browser and click Start presenting.
2. Display Student link / QR on the welcome screen. The students need only a browser and connectivity for the core.
3. Open one additional student tab to demonstrate independent progress. Each device has its own work; your navigation does not move student pages.
4. Use Settings → Fullscreen if available; choose low quality or diagram mode for weaker devices.
5. Explain the safe teaching terminal: virtual files, a defined Git command subset, illustrative IDs and clone URL, simulated GitHub review.
6. Keep the command reference, starter archive, this runbook, and answer key available. Save the source/offline backup.
7. State the pacing rule: everyone follows your screen cue; quizzes are private and retryable; pair up if useful.

## Run of show — 150 minutes

| Session elapsed | Screens | Focus |
|---|---|---|
| 0–16 min | 1–7 | Welcome, motivation, snapshot model, Git/GitHub origin story, quiz |
| 16–46 min | 8–14 | Terminal basics, init, working/index/commit, inspection, staging/ignore drills, quiz |
| 46–72 min | 15–21 | History, restore/revert, branches/HEAD, fast-forward, conflict drill, quiz |
| 72–87 min | 22–26 | Local/remote, clone/fetch, push/pull, PR/review, quiz |
| 87–92 min | 27 | Pit break and reference |
| 92–142 min | 28–34 | Briefing and six connected missions; final lap |
| 142–150 min | 35–37 | Explain the history, exit quiz, downloads and next steps |
| Optional 150–180 min | 38–40 | Prepared real Git/GitHub lab |

If you start at 16:00, the core ends at 18:30; the optional lab ends at 19:00.

## Fixed frame controls and teaching habits

The final website has **75 frames**: 72 core and 3 optional. The 40 topics below are split into concept/practice/question frames; the [full 75-frame progression](garage-to-grid-screen-progression.md) gives each one individually. Use the displayed frame number for classroom cues.

Dark and light mode toggle in the top bar. There is no page scrolling: terminal results, file sections, history, diffs, reference and notes use page controls. On a phone, use Explanation/Illustration or Files/Car/Terminal tabs. The final lap has a dedicated full-stage frame.

## Controls and teaching habits

- Student/Presenter toggles the view. Presenter notes expose teaching prompts and intended answers.
- Arrow keys move screens in presenter mode, except while focused in inputs or editors. Continue/Previous work in both views.
- Click suggested commands to load them into the terminal, then press Enter. Up/Down recall command history.
- Edit a configuration file directly. Its working preview responds immediately; add/commit are still necessary to record it.
- Preview menu distinguishes Working, Index, HEAD, branches, tracking refs, earlier commits, remote main and pushed proposals.
- History shows actual stored parents and refs. Click a commit to inspect without moving the working branch.
- The GitHub panel reviews pushed snapshots. After merge, switch local main and pull before the integrated lap.
- On a phone, Files/Car/Terminal tabs switch workspace panes. All instructions remain above the workspace.
- Progress saves on the device. Settings exports/imports a bounded progress file. Incognito or cleared storage starts again.

## Catch up without losing the class

Reveal hints one at a time. Let pairs explain the next command. If a student falls behind in the main exercise, open the upcoming mission and select Load assisted checkpoint. This replaces the main exercise with a prepared state and marks it assisted; confirm only if intended. Earlier lessons use independent drill states.

The mission starts fresh at screen 29; it does not reuse arbitrary earlier drill edits. Screens 8–12 share the first drill; history/recovery, branches, conflict and remote demos have their own workspaces. Screen 16’s revert demo is separately prepared so dirty recovery edits do not block reversal.

## 120-minute adaptation

Keep the concepts but use instructor-led drill demonstrations: spend 14 minutes on origins, 23 on snapshots (selective staging and ignore shown together), 20 on history/branches/conflict, 13 on remote/review, a 5-minute break, 40 on the long exercise (use catch-up checkpoints), and 5 on debrief. Total 120 minutes. The website’s nominal screen times remain the full 150-minute program.

## 180-minute adaptation

Run the full core, then the 30-minute real lab only for students whose Git and GitHub authentication are already prepared. Other students pair up, repeat the mission with different branch names, or explain graph/recovery scenarios. Fresh installations and account authentication cannot be guaranteed within the lab slot.

## Venue failure recovery

- Weak GPU: Settings → low or diagram. Reduced motion provides the textual test report.
- Student lost work: import their exported progress; otherwise use an assisted checkpoint.
- Mistyped command: read its explanation; state is preserved for rejected commands. Ask git help <command>.
- Dirty switch/merge/pull: inspect status, record or deliberately restore intended edits, then retry.
- Conflict: choose content from requirements, remove markers, add, commit; merge --abort returns to pre-merge state.
- Site available but Wi-Fi crowded: pair students, use the projector and cached open tabs. Loaded exercises operate independently.
- Venue Internet unavailable: use the offline instructor build, served over localhost, and demonstrate/pair until connectivity returns. The real GitHub lab needs Internet.

## Every teaching topic, one by one

### 01. Welcome to Autocrew: Garage to Grid — 3 minutes

Core session · elapsed 0–3 minutes.

**See:** the race prototype in a 3D garage, workshop title, ENISO/Autocrew text branding, and the journey from garage to starting grid. On the SAME welcome screen, show **Ayoub Dhaouadi — Software Engineer · M2 Research Master’s Student at ENIT**, with **Signals, Systems and Data** beneath. Include [LinkedIn](https://www.linkedin.com/in/ayoub-dhaouadi-eng/) and [GitHub](https://github.com/crunchy-tf) buttons opening new tabs. All essential instructor details are initially visible; an About panel repeats them later.

**Explain:** by the end, students will record changes, work on branches, resolve a conflict, and submit reviewed work. The car makes file changes visible.

**Do:** open the same student URL/QR; select student mode and check that the page loads. Orbit the car or choose a camera preset. Pair up if useful.

**Result:** everyone can access the workshop; no GitHub account or installation is needed for the core session.

### 02. Which “final” project is actually final? — 3 minutes

Core session · elapsed 3–6 minutes.

**See:** `car-final`, `car-final-v2`, and `car-final-REAL`, each with a different vehicle preview and a contradictory change.

**Explain:** names alone do not establish which version is correct or why it changed.

**Do:** predict which evidence would help: author, change description, earlier versions, and review.

**Result:** students encounter the problem version control solves before memorizing commands.

### 03. Snapshots and Git's basic model — 4 minutes

Core session · elapsed 6–10 minutes.

**See:** a project's development as labelled snapshots, with who/what/why information. An exploded diagram connects file contents (blobs), folder structure (trees), and a commit containing a snapshot reference, parents, author, and message.

**Explain:** version control records development and supports comparison, recovery, and collaboration. Real Git objects have content-derived IDs; saved commits are immutable. A later correction creates another commit. Explain these visually, without cryptographic calculations or plumbing commands.

**Do:** identify which information was missing from the previous screen.

**Result:** a repository records snapshots and their relationships; the command interface will manipulate that model.

### 04. Git's origin story — 3 minutes

Core session · elapsed 10–13 minutes.

**See:** a short Linux → BitKeeper → Git timeline, highlighting 2002 and 2005.

**Explain:** Linux development needed to coordinate many contributions. After the BitKeeper relationship broke down in 2005, the community, especially Linus Torvalds, developed Git with speed, distributed work, and branching among its goals.

**Do:** predict why local history and parallel development matter for a large team.

**Result:** Git's design serves concrete collaboration needs.

### 05. GitHub joins the story — 1 minutes

Core session · elapsed 13–14 minutes.

**See:** Git's 2005 marker followed by GitHub's public launch on 10 April 2008; a local repository connected to a hosted collaboration space.

**Explain:** GitHub hosts Git repositories and adds ways to discuss, review, and collaborate on work.

**Do:** connect the garage team's need for review with a hosting platform.

**Result:** Git and GitHub have different jobs and different histories.

### 06. Git versus GitHub — 1 minutes

Core session · elapsed 14–15 minutes.

**See:** a direct comparison: Git manages version history; GitHub provides online hosting/collaboration.

**Explain:** commits are usually local. Sharing with a hosted remote is a separate action. Other Git hosting platforms also exist.

**Do:** sort “save a commit” and “open a pull request” into the appropriate categories.

**Result:** students distinguish the tool from the platform.

### 07. Origin-story checkpoint — 1 minutes

Core session · elapsed 15–16 minutes.

**See:** two quick quiz cards.

**Do:** answer “Can you create a Git commit offline?” (**yes**) and “Which statement is accurate?” (**Git tracks versions; GitHub supports hosted collaboration**).

**Explain/result:** show the reason for each option and allow a retry. No speed score or public ranking.

### 08. Your first terminal inspection — 4 minutes

Core session · elapsed 16–20 minutes.

**See:** a safe virtual terminal starting in `/workshop`, with a prepared `garage-to-grid` folder.

**Do:** run `pwd`, `ls`, `cd garage-to-grid`, `ls`, and `cat README.md` with short explanations beside each command.

**Explain:** current directory, folders/files, and the difference between entering a folder and reading a file. Use the website editor for changes.

**Result:** students can find the project without needing broader shell knowledge. This is drill 1.

### 09. Create your first repository — 3 minutes

Core session · elapsed 20–23 minutes.

**See:** the prepared plain project files beside the car, followed by an initialized repository with unborn main and no saved commits yet.

**Explain:** these configuration files describe the prototype. `git init -b main` starts a repository and names its initial branch; `.git` holds Git's internal data. Briefly show the real Git identity setup commands as preparation guidance; this simulator uses its prepared author identity.

**Do:** run `git init -b main` in the folder entered on s08. Select `lighting.cfg` and read `headlights=off`. Learn where `git help <command>` and the reference drawer are available.

**Result:** the repository exists but its files remain untracked until selected and recorded. Do not create the initial commit silently.

### 10. Working files, staging area, saved commit — 5 minutes

Core session · elapsed 23–28 minutes.

**See:** three labelled states with one file travelling through them and a vehicle preview for the selected version.

**Explain:** editing changes working files; staging selects content for a snapshot; committing records that snapshot.

**Do:** predict whether an edit alone is a commit. After the three states are explained, create the baseline with `git add .` and `git commit -m "Save starting prototype"`. All supplied baseline files belong to this initial snapshot.

**Result:** students understand the three states as distinct.

### 11. Ask Git what changed — 3 minutes

Core session · elapsed 28–31 minutes.

**See:** an edit from `headlights=off` to `headlights=on`; the light turns on in the working preview.

**Do:** run `git status` and `git diff`.

**Explain:** status summarizes the situation; diff reveals changed content. The scene responds to the file, not to the inspection command.

**Result:** students inspect before recording a change.

### 12. Stage and save the repair — 4 minutes

Core session · elapsed 31–35 minutes.

**Do:** run `git add lighting.cfg`, `git diff --staged`, and `git commit -m "Enable headlights"`.

**See:** the staged snapshot, then a new commit in the graph. Inspect the saved vehicle preview.

**Explain:** a useful commit message describes a focused change.

**Result:** the lighting repair is recorded; committing did not automatically share it online.

### 13. Mini exercises: selective staging and ignore logs — 8 minutes

Core session · elapsed 35–43 minutes.

**See:** a separate drill repository with lighting and steering edits, a tracked `.gitignore`, and an untracked generated `telemetry.log`.

**Do:** first inspect status/diff and stage both edited configuration files. Use `git restore --staged steering.cfg` to remove the unrelated edit from the index while preserving its working content; commit only the lighting repair. Then add `*.log` to `.gitignore`, inspect status, stage the ignore rule, and commit it. Use roughly four minutes for each part.

**Explain:** select intended content. Distinguish tracked, untracked, modified, staged, and ignored files. `.gitignore` excludes matching untracked generated files; it does not remove an already tracked file or erase prior history.

**Result:** the repair is focused, the unrelated edit remains available, and generated telemetry stays outside version history. This is drill 2, with two short parts.

### 14. The staging trap — 3 minutes

Core session · elapsed 43–46 minutes.

**See:** a file staged with `headlights=on`, then edited back to `off` before committing.

**Do:** answer two questions: which edited files are committed (**the staged content**) and what happens after another edit following `git add` (**the staged version remains until staged again**).

**Explain:** compare Working: Off, Index: On, and Commit: On after the commit.

**Result:** students understand that staging captures a version, not an ongoing promise to include future edits.

### 15. Read the car's history — 4 minutes

Core session · elapsed 46–50 minutes.

**See:** a commit timeline with messages, IDs, and selectable snapshots.

**Do:** run `git log --oneline` and `git show <commit-id>` using an actual displayed simulation ID. Demonstrate `git log --oneline --graph --all --decorate` and relate it to the clickable graph.

**Explain:** a commit identifies a saved snapshot. History is a directed acyclic graph of parent relationships; merges can have two parents. Inspection changes neither working files nor the current branch.

**Result:** students can find evidence about an earlier change.

### 16. Recover a file and understand undo — 4 minutes

Core session · elapsed 50–54 minutes.

**See:** a prototype that steers incorrectly and a few earlier commits.

**Do:** in an independent recovery drill, inspect history to find where `calibrated` changed to `reversed`; preview the earlier configuration; run `git restore --source <good-commit> -- steering.cfg`. Show `git restore <file>` for restoring working content from the index. Use a SEPARATE prepared demonstration repository for `git revert <bad-commit>` so the revert starts from clean state.

**Explain:** restore changes selected file content without moving history. `git restore --staged` affects the index; a normal restore affects working files. A revert records a new corrective commit and preserves the earlier commit. Keep history-rewriting reset/amend as optional reference topics.

**Result:** students recover a historical file and distinguish file recovery from reversing committed work. This is drill 3, with a short instructor revert demonstration.

### 17. A branch is a line of development — 4 minutes

Core session · elapsed 54–58 minutes.

**See:** a commit graph with main and a feature branch pointing to commits; compare baseline and experimental snapshots.

**Explain:** a branch is a mutable reference to a commit; HEAD normally points to the current branch. Committing advances that branch; switching changes where HEAD points. A branch is not a physical duplicate folder. A new branch initially identifies the same commit. Show `git branch` and `git branch <name>` alongside the create-and-switch shortcut used next.

**Do:** predict what changes immediately after creating a branch.

**Result:** students understand branch identity before making an upgrade.

### 18. Mini exercise: dashboard experiment — 4 minutes

Core session · elapsed 58–62 minutes.

**Do:** `git switch -c cockpit-display`; edit `dashboard.cfg` to `enabled=on`; add/commit; switch back to main.

**See:** the active dashboard in the feature version and the unchanged baseline on main.

**Explain:** the branch owns a recorded development path; switching selects another version.

**Result:** the upgrade exists independently. This is drill 4.

### 19. Merge a finished upgrade — 3 minutes

Core session · elapsed 62–65 minutes.

**Do:** from main, run `git merge cockpit-display`.

**See:** the dashboard appears on main and its pointer advances. This example is a fast-forward.

**Explain:** a merge integrates another development path; some integrations simply move a branch forward.

**Result:** students connect merge output with both the graph and vehicle.

### 20. A conflict is a decision to make — 4 minutes

Core session · elapsed 65–69 minutes.

**See:** a prepared local conflict drill: one contribution chooses wet tyres, another slicks, with dry tyres as their shared baseline.

**Do:** merge the prepared branch; inspect the markers; choose `compound=wet` for the shown wet track; remove markers; stage and commit. Show `git merge --abort` as a way to return to pre-merge state before retrying.

**Explain:** decide using the project's requirement. Git does not know which tyre setting suits the event.

**Result:** the merge completes and the configuration becomes valid. This is drill 5; instructor and students can resolve it together.

### 21. Branch and merge checkpoint — 3 minutes

Core session · elapsed 69–72 minutes.

**Do:** answer two questions: why create a branch (**develop work separately**) and which example needs conflict resolution (**incompatible edits to the same overlapping content**).

**See:** an independent-file example alongside the conflicting tyre line.

**Result:** students explain the distinction, rather than assuming every merge conflicts.

### 22. Your repository and the remote — 3 minutes

Core session · elapsed 72–75 minutes.

**See:** two distinct repository diagrams, local and hosted, linked by directional operations.

**Explain:** `origin` is a conventional remote name. Inspect it with `git remote -v`. Local main, a remote-tracking reference, and remote main can identify different versions; `-u` later establishes upstream correspondence.

**Do:** predict whether saving a local commit changes the remote automatically.

**Result:** students can reason about where work currently exists.

### 23. Clone versus fetch — 3 minutes

Core session · elapsed 75–78 minutes.

**See:** cloning creates a local copy; later fetching updates its knowledge of the remote.

**Do:** follow short demonstrations of `git clone <repository-url>` and `git fetch origin`.

**Explain:** fetch does not apply those changes to working files. A GitHub fork creates a hosted repository copy; clone creates a working copy. The workshop URL is illustrative and handled by the simulation.

**Result:** students distinguish getting a repository from getting updates.

### 24. Push and pull — 3 minutes

Core session · elapsed 78–81 minutes.

**See:** committed work travelling toward the remote; an accepted remote update later reaching the current local branch.

**Do:** follow `git push -u origin <branch>` and `git pull --ff-only origin main` examples.

**Explain:** push shares commits; uncommitted edits remain local. This workshop uses a fast-forward-only pull path and explains divergence errors.

**Result:** students understand sharing and synchronization as separate actions.

### 25. A pull request invites review — 4 minutes

Core session · elapsed 81–85 minutes.

**See:** a simulated GitHub panel with base/head branches, proposed diff, vehicle checks, and review status.

**Do:** inspect a proposal, request/complete the prepared review, and merge it remotely.

**Explain:** an issue describes work or a problem; a pull request proposes a change for review. A pull request is a hosting-platform feature, not a `git` command. Review examines the pushed snapshot.

**Result:** students see how feedback precedes integration.

### 26. Collaboration checkpoint — 2 minutes

Core session · elapsed 85–87 minutes.

**Do:** answer whether a local commit automatically updates GitHub (**no**) and identify the Git command among `git push` and opening a pull request (**git push**).

**See:** explanations and the complete branch → commit → push → review → merge → synchronize sequence.

**Result:** the core eight quiz questions are complete.

### 27. Pit break and command reference — 5 minutes

Core session · elapsed 87–92 minutes.

**See:** agenda, compact command reference, and readiness check.

**Do:** take the break; revisit a drill or consult the reference if needed.

**Result:** begin the long mission together after the instructor's cue.

### 28. Mission briefing — 2 minutes

Core session · elapsed 92–94 minutes.

**See:** a dark garage, wet test track, marked obstacle, six mission checkpoints, and a prototype with failed checks.

**Explain:** repair the car on a working branch, integrate contributions, and submit reviewed work. The older steering setting is a clue. Demonstrate the hint ladder without revealing the whole solution.

**Do:** start the main mission; choose individual or pair work.

**Result:** a fresh main repository context, separate from all drills.

### 29. Mission 1: receive and investigate — 4 minutes

Core session · elapsed 94–98 minutes.

**Do:** clone the illustrative repository; `cd garage-to-grid`; inspect files/status/`git remote -v`/log; show the relevant historical commit.

**See:** the baseline car and a labelled historical preview with correct steering.

**Completion:** a local repository exists and the earlier correct setting has been inspected. Cloning does not automatically enter its directory.

### 30. Mission 2: restore essentials — 9 minutes

Core session · elapsed 98–107 minutes.

**Do:** create a working branch, suggested `race-ready`; recover steering with `git restore --source <discovered-good-commit> -- steering.cfg`; set headlights on; inspect diff; stage the two files; commit the repair.

**See:** headlight beams and a passing steering test; the saved repair appears in the graph.

**Completion:** correct lighting/steering content is committed on a working branch, with a diff inspection recorded. The main branch remains the baseline.

### 31. Mission 3: develop the cockpit — 8 minutes

Core session · elapsed 107–115 minutes.

**Do:** create a feature branch; enable the dashboard; commit; return to the working branch; merge.

**See:** active cockpit instruments, feature/baseline comparison, and the integrated working car.

**Completion:** a distinct feature branch and its recorded dashboard change have been integrated. Sensible alternative branch names are accepted.

### 32. Mission 4: integrate the pit crew — 7 minutes

Core session · elapsed 115–122 minutes.

**See:** sensor beams identify the obstacle; the graph shows the combined contributions.

**Do:** `git fetch origin`, inspect the update, and `git merge origin/pit-crew` while on the working branch.

**Completion:** the remote contribution has been fetched and merged; fetch alone does not enable the sensors.

### 33. Mission 5: resolve the tyre disagreement — 12 minutes

Core session · elapsed 122–134 minutes.

**Do:** commit `compound=wet` locally; fetch the prepared tyre plan; merge `origin/tyre-plan`; inspect markers; retain the wet-track choice; remove markers; stage and complete the merge commit.

**See:** configuration validation identifies the conflict; the resolved vehicle has wet tyres and passes the traction check.

**Explain:** both contributions changed the same baseline value for different conditions. The track requirement guides the decision.

**Completion:** the conflict is resolved in a committed merge, with no marker text left in the valid vehicle configuration.

### 34. Mission 6: review, synchronize, and reach the grid — 8 minutes

Core session · elapsed 134–142 minutes.

**Do:** push the working branch; open the simulated pull request; inspect its diff/checks; complete the prepared review; merge remotely; `git switch main`; `git pull --ff-only origin main`.

**See:** the remote accepted car first, then the synchronized local main car. Press Test Lap; the completed prototype follows the track successfully.

**Completion:** the reviewed pushed snapshot is integrated into remote main and local main. Unstaged edits cannot sneak into the proposal. The final lap occupies the end of this mission's allotted time.

### 35. What your team actually accomplished — 3 minutes

Core session · elapsed 142–145 minutes.

**See:** the final car, complete commit graph, mission evidence, and a summary of the repair/contribution sequence.

**Do:** explain one commit, show where a branch was integrated, and identify the conflict-resolution decision.

**Result:** students connect the successful vehicle with development history, not just a checklist of commands.

### 36. Exit checkpoint — 3 minutes

Core session · elapsed 145–148 minutes.

**Do:** identify what a commit saves; explain when a conflict requires a decision; order branch/commit/push/pull-request/review/merge/synchronize.

**See:** brief explanatory feedback and links to the relevant chapter for a retry.

**Result:** a final understanding check without public grades or speed pressure.

### 37. Take it into a real project — 2 minutes

Core session · elapsed 148–150 minutes.

**See:** downloadable command reference, the plain-text starter project, setup checklist, and links to official Git/GitHub documentation.

**Explain:** the same concepts apply outside this simulation. Real GitHub work requires a real repository/account and prepared authentication.

**Do:** save the student link and resources. If the session ends at 150 minutes, this is the final screen.

**Result:** a clear route from the workshop to independent practice.

### 38. Check your real environment — 8 minutes

Optional extension · elapsed 150–158 minutes.

**See/do:** starter download; terminal location guidance; `git --version`; `git config --global user.name "Your Name"`; `git config --global user.email "you@example.com"`; `git help <command>`; check that GitHub authentication is already ready. Replace identity placeholders with the student's own details.

**Result:** prepared students can begin; others pair up or use the alternative guided practice. Do not promise fresh installation/authentication fits in this slot.

### 39. Make a real local repair — 8 minutes

Optional extension · elapsed 158–166 minutes.

**Do:** initialize the starter with `git init -b main`; inspect/edit a file; stage/commit; inspect real history; create a feature branch and record an improvement.

**Result:** the command output and recorded files come from real Git on the student's computer.

### 40. Share and review on real GitHub — 14 minutes

Optional extension · elapsed 166–180 minutes.

**Do:** use a prepared personal repository; `git remote add origin <actual-repository-url>` and inspect `git remote -v`; push main and the feature branch; open a pull request in GitHub; inspect/review/merge; synchronize local main.

**Result:** a real contribution in a real repository. Use current official authentication instructions and no account-password push guidance.

If the environment is not ready, extend the core with another independent mission attempt and discussion. An optional, separately tested regression/revert screen may replace part of this extension: inspect a prepared bad single-parent commit and revert it, observing a new corrective commit. Enable that bonus only after its simulator behaviour has been implemented and verified.
