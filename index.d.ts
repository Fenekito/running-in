// Type definitions for running-in
// Project: https://github.com/your-username/running-in
// Definitions by: Juan Claudio Caires Pereira <https://github.com/Fenekito>

declare module 'running-in' {
    /**
     * A utility for detecting the current JavaScript environment.
     */
    const is: {
        /**
         * Checks if the code is running in a browser environment.
         */
        readonly browser: boolean;

        /**
         * Checks if the code is running in a Node.js environment.
         */
        readonly node: boolean;

        /**
         * Checks if the code is running in a web worker.
         */
        readonly webWorker: boolean;

        /**
         * Checks if the code is running in a Deno environment.
         */
        readonly deno: boolean;

        /**
         * Checks if the code is running as a module (ESM).
         */
        readonly module: boolean;

        /**
         * Checks if the environment is set to production.
         * Relies on `process.env.NODE_ENV`.
         */
        readonly production: boolean;

        /**
         * Checks if the environment is set to development.
         * Relies on `process.env.NODE_ENV`.
         */
        readonly development: boolean;

        /**
         * Checks if the environment is set to test.
         * Relies on `process.env.NODE_ENV`.
         */
        readonly test: boolean;

        /**
         * Checks if the code is running in any known CI/CD environment.
         */
        readonly ci: boolean;

        /**
         * Checks if running in GitHub Actions.
         */
        readonly githubActions: boolean;

        /**
         * Checks if running in Vercel.
         */
        readonly vercel: boolean;

        /**
         * Checks if running in Netlify.
         */
        readonly netlify: boolean;

        /**
         * Checks if running in GitLab CI.
         */
        readonly gitlab: boolean;

        /**
         * Checks if running in Travis CI.
         */
        readonly travis: boolean;

        /**
         * Checks if running in Jenkins.
         */
        readonly jenkins: boolean;

        /**
         * Checks if running in CircleCI.
         */
        readonly circleCI: boolean;

        /**
         * Checks if the browser is Chrome.
         */
        readonly chrome: boolean;

        /**
         * Checks if the browser is Firefox.
         */
        readonly firefox: boolean;

        /**
         * Checks if the browser is Safari.
         */
        readonly safari: boolean;

        /**
         * Checks if the browser is Edge.
         */
        readonly edge: boolean;

        /**
         * Checks if the device is a mobile device.
         */
        readonly mobile: boolean;

        /**
         * Checks if the device is a tablet.
         */
        readonly tablet: boolean;
    };

    export default is;
}
