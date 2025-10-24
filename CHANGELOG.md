# Changelog

All notable changes to this project will be documented in this file.

## [1.1.0] - 2025-10-24

### Added
- changed namespace to `runningIn`
-   `getInfo()` function that provides detailed environment information including OS, browser, device, capabilities, and runtime details.
-   Dynamic parsing of user agent strings for browser environments.
-   System information extraction for Node.js environments

## [1.0.0] - 2025-09-18

### Added

-   Initial release of `running-in`.
-   Core environment detection for `browser`, `node`, `webWorker`, `deno`, and `module`.
-   Build environment detection for `production`, `development`, and `test`.
-   CI/CD detection for `ci`, `githubActions`, `vercel`, `netlify`, `gitlab`, `travis`, `jenkins`, and `circleCI`.
-   Browser and device detection for `chrome`, `firefox`, `safari`, `edge`, `mobile`, and `tablet`.
-   TypeScript type definitions.
-   Comprehensive `README.md` documentation.
-   `LICENSE` (MIT).
-   `.npmignore` to ensure a clean package.
