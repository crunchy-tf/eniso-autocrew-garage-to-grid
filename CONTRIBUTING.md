# Contributing

Thanks for helping improve the ENISO Autocrew workshop.

1. Fork the repository, clone your fork, and follow the Windows or macOS/Linux setup in README.md.
2. Create a focused branch: `git switch -c feature/your-change`.
3. Make the change and check the corresponding lesson or mission in the browser.
4. Run `npm run typecheck`, `npm test`, and `npm run build`. On PowerShell, use `npm.cmd` in place of `npm`.
5. Commit with a message explaining the change, push your branch, and open a pull request.

For a terminal change, preserve working/index/commit distinctions and verify the behavior against real Git where appropriate. Mission checks should accept equivalent valid workflows while still requiring the actual learning outcome.

For a visual change, check dark/light modes, smaller screens, fixed-frame layout, and diagram/reduced-motion fallback. Files and terminal output use explicit pagination.

Keep dependencies in package-lock.json. Do not commit node_modules, dist, credentials, or exported personal workshop progress. Preserve bundled asset and dependency license notices.

For a bug report, include the frame/mission, the command sequence, expected behavior, actual behavior, and browser/OS. A small reproducible example helps.
