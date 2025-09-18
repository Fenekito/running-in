# running-in

A tiny, zero-dependency utility for environment detection in JavaScript.

running-in provides a simple way to check where the code you wrote is being run, whether on a browser, phone, or tablet. You can easily detect the environment and adapt your code logic accordingly.

## Why?

-   **Simple & Readable:** Use `is.browser`, `is.mobile`, or `is.chrome` for clear, one-line checks—no need without the need of parsing user agents.
-   **Zero Dependencies:** Add it to any project without extra baggage.
-   **Universal:** Works in Node.js, browsers, Deno, and web workers.
-   **CI/CD Aware:** Easily detect if your code is running in a CI/CD pipeline.
-   **Tree-Shakable:** Modern bundlers can eliminate unused checks, keeping your bundle size minimal.

## Installation

```bash
npm install running-in
```

## Usage

Import the `is` object and use its boolean properties to check the current environment.

```javascript
import is from 'is-what';

if (is.node) {
  console.log('Running in a Node.js environment.');
}

if (is.browser && is.mobile) {
  console.log('Running on a mobile browser.');
}

if (is.production) {
  // Configure production settings
}

if (is.ci && is.githubActions) {
    console.log('This code is running in a GitHub Actions pipeline!');
}
```

## API

All properties are boolean getters.

### Runtime Environments

-   `is.browser`: `true` if in a browser environment.
-   `is.node`: `true` if in a Node.js environment.
-   `is.webWorker`: `true` if in a Web Worker.
-   `is.deno`: `true` if in a Deno environment.
-   `is.module`: `true` if running as an ES Module.

### Build Environments

These checks rely on `process.env.NODE_ENV` and are only available in Node.js environments.

-   `is.production`: `true` if `NODE_ENV` is `'production'`.
-   `is.development`: `true` if `NODE_ENV` is `'development'` or not set.
-   `is.test`: `true` if `NODE_ENV` is `'test'`.

### CI/CD Environments

These checks rely on environment variables set by popular CI/CD providers.

-   `is.ci`: A general check for any known CI/CD environment.
-   `is.githubActions`: `true` if in GitHub Actions.
-   `is.vercel`: `true` if in a Vercel deployment.
-   `is.netlify`: `true` if in a Netlify deployment.
-   `is.gitlab`: `true` if in GitLab CI.
-   `is.travis`: `true` if in Travis CI.
-   `is.jenkins`: `true` if in Jenkins.
-   `is.circleCI`: `true` if in CircleCI.

### Browser & Device Specifics

These checks are only available in browser environments and rely on the `navigator.userAgent` string.

-   `is.chrome`: `true` for Google Chrome.
-   `is.firefox`: `true` for Mozilla Firefox.
-   `is.safari`: `true` for Apple Safari.
-   `is.edge`: `true` for Microsoft Edge (Chromium).
-   `is.mobile`: `true` if the user agent suggests a mobile device.
-   `is.tablet`: `true` if the user agent suggests a tablet device.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

[MIT](LICENSE)
