'use strict';

/**
 * A utility for detecting the current JavaScript environment.
 * @namespace is
 */
const is = Object.create(null);

// --- Basic Environment Detection ---

/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean}
 */
is.browser = typeof window !== 'undefined' && typeof window.document !== 'undefined';

/**
 * Checks if the code is running in a Node.js environment.
 * @returns {boolean}
 */
is.node = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

/**
 * Checks if the code is running in a web worker.
 * @returns {boolean}
 */
is.webWorker = typeof self === 'object' && self.constructor && self.constructor.name === 'DedicatedWorkerGlobalScope';

/**
 * Checks if the code is running in a Deno environment.
 * @returns {boolean}
 */
is.deno = typeof Deno !== 'undefined' && typeof Deno.version !== 'undefined';

/**
 * Checks if the code is running as a module (ESM).
 * @returns {boolean}
 */
is.module = (() => {
    try {
        // This will throw an error in a CJS context but not in an ESM context.
        // It's a bit of a hack, but it's a common way to detect ESM.
        return (new Function('import.meta'))(), true;
    } catch (e) {
        return false;
    }
})();

// --- Build/Mode Detection ---

/**
 * Checks if the environment is set to production.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
is.production = is.node && process.env.NODE_ENV === 'production';

/**
 * Checks if the environment is set to development.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
is.development = is.node && (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined);

/**
 * Checks if the environment is set to test.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
is.test = is.node && process.env.NODE_ENV === 'test';

// --- CI/CD Environment Detection ---

/**
 * Checks if the code is running in any known CI/CD environment.
 * @returns {boolean}
 */
is.ci = !!(
    (is.node && (process.env.CI || process.env.CONTINUOUS_INTEGRATION)) ||
    process.env.BUILD_NUMBER ||
    process.env.RUN_ID ||
    false
);

/**
 * Checks if running in GitHub Actions.
 * @returns {boolean}
 */
is.githubActions = is.node && process.env.GITHUB_ACTIONS === 'true';

/**
 * Checks if running in Vercel.
 * @returns {boolean}
 */
is.vercel = is.node && process.env.VERCEL === '1';

/**
 * Checks if running in Netlify.
 * @returns {boolean}
 */
is.netlify = is.node && process.env.NETLIFY === 'true';

/**
 * Checks if running in GitLab CI.
 * @returns {boolean}
 */
is.gitlab = is.node && process.env.GITLAB_CI === 'true';

/**
 * Checks if running in Travis CI.
 * @returns {boolean}
 */
is.travis = is.node && process.env.TRAVIS === 'true';

/**
 * Checks if running in Jenkins.
 * @returns {boolean}
 */
is.jenkins = is.node && process.env.JENKINS_URL !== undefined;

/**
 * Checks if running in CircleCI.
 * @returns {boolean}
 */
is.circleCI = is.node && process.env.CIRCLECI === 'true';


// --- Browser Specifics (if in browser) ---

/**
 * Checks if the browser is Chrome.
 * @returns {boolean}
 */
is.chrome = is.browser && /chrome/i.test(navigator.userAgent);

/**
 * Checks if the browser is Firefox.
 * @returns {boolean}
 */
is.firefox = is.browser && /firefox/i.test(navigator.userAgent);

/**
 * Checks if the browser is Safari.
 * Note: This can be tricky as other browsers include "Safari" in their user agent.
 * @returns {boolean}
 */
is.safari = is.browser && /safari/i.test(navigator.userAgent) && !/chrome/i.test(navigator.userAgent);

/**
 * Checks if the browser is Edge.
 * @returns {boolean}
 */
is.edge = is.browser && /edg/i.test(navigator.userAgent);

/**
 * Checks if the device is a mobile device.
 * @returns {boolean}
 */
is.mobile = is.browser && /Mobi/i.test(navigator.userAgent);

/**
 * Checks if the device is a tablet.
 * @returns {boolean}
 */
is.tablet = is.browser && /Tablet/i.test(navigator.userAgent);


// Freeze the object to prevent modification
Object.freeze(is);

module.exports = is;
