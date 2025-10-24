// Type definitions for running-in
// Project: https://github.com/Fenekito/running-in
// Definitions by: Juan Claudio Caires Pereira <https://github.com/Fenekito>

declare module 'running-in' {
    /**
     * A utility for detecting the current JavaScript environment.
     */
    const runningIn: {
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
         * Checks if the code is running as CommonJS (CJS).
         */
        readonly commonjs: boolean;

        /**
         * Checks if the code is running in a Bun environment.
         */
        readonly bun: boolean;

        /**
         * Checks if the code is running in an iframe (browser only).
         */
        readonly iframe: boolean;

        /**
         * Checks if the code is running in a service worker.
         */
        readonly serviceWorker: boolean;

        /**
         * Checks if running in a containerized environment (Docker, etc).
         */
        readonly containerized: boolean;

        /**
         * Checks if debug mode is enabled via environment variables.
         */
        readonly debug: boolean;

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
         * Checks if the code is running in GitHub Actions.
         */
        readonly githubActions: boolean;

        /**
         * Checks if the code is running in Vercel.
         */
        readonly vercel: boolean;

        /**
         * Checks if the code is running in Netlify.
         */
        readonly netlify: boolean;

        /**
         * Checks if the code is running in GitLab CI.
         */
        readonly gitlab: boolean;

        /**
         * Checks if the code is running in CircleCI.
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
         * Checks if the device is running in a mobile device.
         */
        readonly mobile: boolean;

        /**
         * Checks if the device is running in a tablet.
         */
        readonly tablet: boolean;

        /**
         * Checks if WebSocket is supported (browser only).
         */
        webSocket(): boolean;

        /**
         * Gets detailed information about the current environment.
         * @returns An object containing detailed environment information including OS, browser, device, and capabilities.
         */
        getInfo(): {
            environment: { type?: string };
            os: { name?: string; version?: string; platform?: string; arch?: string; hostname?: string; cpus?: number; totalMemory?: number; freeMemory?: number };
            browser: { name?: string; version?: string; engine?: string };
            device: { type?: string; vendor?: string; model?: string };
            capabilities: { touch?: boolean; webgl?: boolean; serviceWorker?: boolean; webRTC?: boolean; webAssembly?: boolean; localStorage?: boolean; sessionStorage?: boolean; indexedDB?: boolean; geolocation?: boolean; notifications?: boolean };
            runtime: { name?: string; version?: string };
        };

        /**
         * Extracts detailed information from an HTTP request object.
         * @param req - The HTTP request object (Node.js req or browser Request)
         * @returns An object containing extracted request information.
         */
        getRequestInfo(req: any): {
            url?: { full?: string; pathname?: string; search?: string; hash?: string; protocol?: string };
            headers?: { [key: string]: any; userAgent?: string; host?: string; contentType?: string; origin?: string; referer?: string };
            method?: string;
            protocol?: string;
            client?: { ip?: string; port?: string; family?: string; type?: string };
            query?: { [key: string]: any };
            body?: { size?: number; type?: string; keys?: string[] };
            isSecure?: boolean;
            isXmlHttpRequest?: boolean;
            error?: string;
        };
    };

    export default runningIn;
}
