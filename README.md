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

## License

[MIT](LICENSE)
