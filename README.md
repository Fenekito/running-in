# running-in

A tiny, zero-dependency utility for environment detection in JavaScript.

running-in provides a simple way to check where the code you wrote is being run, whether on a browser, phone, or tablet. You can easily detect the environment and adapt your code logic accordingly.

## Why?

- **Simple & Readable:** Use `runningIn.browser`, `runningIn.mobile`, or `runningIn.chrome` for clear, one-line checks—no need without the need of parsing user agents.
- **Zero Dependencies:** Add it to any project without extra baggage.
- **Universal:** Works in Node.js, browsers, Deno, and web workers.
- **CI/CD Aware:** Easily detect if your code is running in a CI/CD pipeline.
- **Request‑Aware Utilities:** Need request context for logging, analytics, or security? Use `runningIn.getRequestInfo(req)` to consistently extract method, headers, query params, protocol, client IP, and more—across Express/Fastify/Next.js API routes or Fetch handlers.

## Installation

```bash
npm install @fenekito/running-in
```

## Usage

### ES Modules

```javascript
import runningIn, {
  node,
  browser,
  ci,
  githubActions,
} from "@fenekito/running-in";

if (node) {
  console.log("Running in a Node.js environment.");
}

if (browser && runningIn.mobile) {
  console.log("Running on a mobile browser.");
}

if (ci && githubActions) {
  console.log("This code is running in a GitHub Actions pipeline!");
}
```

### CommonJS

```javascript
const runningIn = require("@fenekito/running-in");

if (runningIn.commonjs) {
  console.log("Using CommonJS modules");
}

if (runningIn.iframe) {
  console.log("Running inside an iframe");
}

if (runningIn.containerized) {
  console.log("Running in a containerized environment");
}
```

### Extract request information

Use `getRequestInfo(req)` to grab useful request details in one call.

```javascript
// Example usage
import runningIn from "@fenekito/running-in";

app.get("/api/users", (req, res) => {
  const info = runningIn.getRequestInfo(req);
  console.log(info.method, info.url.pathname, info.query);
  console.log(info.client.ip, info.headers.userAgent);
  //
});
```

## Detailed Environment Information

For more detailed information about the environment, use the `getInfo()` function:

```javascript
import runningIn from "@fenekito/running-in";

const info = runningIn.getInfo();

console.log("OS:", info.os.name, info.os.version);
console.log("Browser:", info.browser.name, info.browser.version);
console.log("Device:", info.device.type, info.device.vendor);
console.log("Capabilities:", info.capabilities);
```

## License

[MIT](LICENSE)
