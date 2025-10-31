"use strict";

/**
 * A utility for detecting the current JavaScript environment.
 * @namespace runningIn
 */
const runningIn = Object.create(null);

/**
 * Checks if the code is running in a browser environment.
 * @returns {boolean}
 */
runningIn.browser =
  typeof window !== "undefined" && typeof window.document !== "undefined";

/**
 * Checks if the code is running in a Node.js environment.
 * @returns {boolean}
 */
runningIn.node =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

/**
 * Checks if the code is running in a web worker.
 * @returns {boolean}
 */
runningIn.webWorker =
  typeof self === "object" &&
  self.constructor &&
  self.constructor.name === "DedicatedWorkerGlobalScope";

/**
 * Checks if the code is running in a Deno environment.
 * @returns {boolean}
 */
runningIn.deno =
  typeof Deno !== "undefined" && typeof Deno.version !== "undefined";

/**
 * Checks if the code is running as a module (ESM).
 * @returns {boolean}
 */
runningIn.module = (() => {
  try {
    // This will throw an error in a CJS context but not in an ESM context.
    // It's a bit of a hack, but it's a common way to detect ESM.
    return new Function("import.meta")(), true;
  } catch (e) {
    return false;
  }
})();

/**
 * Checks if the code is running as CommonJS (CJS).
 * @returns {boolean}
 */
runningIn.commonjs = runningIn.node && !runningIn.module;

/**
 * Checks if the code is running in a Bun environment.
 * @returns {boolean}
 */
runningIn.bun =
  typeof Bun !== "undefined" && typeof Bun.version !== "undefined";

/**
 * Checks if the code is running in an iframe (browser only).
 * @returns {boolean}
 */
runningIn.iframe = (() => {
  try {
    return runningIn.browser && window.self !== window.top;
  } catch (e) {
    return false;
  }
})();

/**
 * Checks if the code is running in a service worker.
 * @returns {boolean}
 */
runningIn.serviceWorker = (() => {
  try {
    return (
      typeof self !== "undefined" &&
      typeof self.importScripts === "function" &&
      typeof ServiceWorkerGlobalScope !== "undefined"
    );
  } catch (e) {
    return false;
  }
})();

/**
 * Checks if running in a containerized environment (Docker, etc).
 * @returns {boolean}
 */
runningIn.containerized = (() => {
  if (!runningIn.node) return false;
  try {
    const fs = require("fs");
    return (
      fs.existsSync("/.dockerenv") ||
      (fs.existsSync("/proc/self/cgroup") &&
        fs.readFileSync("/proc/self/cgroup", "utf8").includes("docker"))
    );
  } catch {
    return false;
  }
})();

/**
 * Checks if debug mode is enabled via environment variables.
 * @returns {boolean}
 */
runningIn.debug =
  runningIn.node && !!(process.env.DEBUG || process.env.DEBUG_MODE);

// --- Build/Mode Detection ---

/**
 * Checks if the environment is set to production.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
runningIn.production = runningIn.node && process.env.NODE_ENV === "production";

/**
 * Checks if the environment is set to development.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
runningIn.development =
  runningIn.node &&
  (process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === undefined);

/**
 * Checks if the environment is set to test.
 * Relies on `process.env.NODE_ENV`.
 * @returns {boolean}
 */
runningIn.test = runningIn.node && process.env.NODE_ENV === "test";

const envCheck = (key, value = "true") =>
  runningIn.node && process.env[key] === value;

/**
 * Checks if the code is running in any known CI/CD environment.
 * @returns {boolean}
 */
runningIn.ci = !!(
  (runningIn.node && (process.env.CI || process.env.CONTINUOUS_INTEGRATION)) ||
  process.env.BUILD_NUMBER ||
  process.env.RUN_ID
);

/**
 * Checks if running in GitHub Actions.
 * @returns {boolean}
 */
runningIn.githubActions = envCheck("GITHUB_ACTIONS");

/**
 * Checks if running in Vercel.
 * @returns {boolean}
 */
runningIn.vercel = envCheck("VERCEL", "1");

/**
 * Checks if running in Netlify.
 * @returns {boolean}
 */
runningIn.netlify = envCheck("NETLIFY");

/**
 * Checks if running in GitLab CI.
 * @returns {boolean}
 */
runningIn.gitlab = envCheck("GITLAB_CI");

/**
 * Checks if running in CircleCI.
 * @returns {boolean}
 */
runningIn.circleCI = envCheck("CIRCLECI");

const uaCheck = (pattern) =>
  runningIn.browser && pattern.test(navigator.userAgent);

/**
 * Checks if the browser is Chrome.
 * @returns {boolean}
 */
runningIn.chrome = uaCheck(/chrome/i);

/**
 * Checks if the browser is Firefox.
 * @returns {boolean}
 */
runningIn.firefox = uaCheck(/firefox/i);

/**
 * Checks if the browser is Safari.
 * @returns {boolean}
 */
runningIn.safari = uaCheck(/safari/i) && !uaCheck(/chrome/i);

/**
 * Checks if the browser is Edge.
 * @returns {boolean}
 */
runningIn.edge = uaCheck(/edg/i);

/**
 * Checks if the device is a mobile device.
 * @returns {boolean}
 */
runningIn.mobile = uaCheck(/Mobi/i);

/**
 * Checks if the device is a tablet.
 * @returns {boolean}
 */
runningIn.tablet = uaCheck(/Tablet/i);

/**
 * Checks if running in an iframe (browser only).
 * @returns {boolean}
 */
runningIn.webSocket = () => {
  try {
    return runningIn.browser && typeof WebSocket !== "undefined";
  } catch {
    return false;
  }
};

/**
 * Gets detailed information about the current environment.
 * @returns {object} An object containing detailed environment information.
 */
runningIn.getInfo = function () {
  const info = {
    environment: {},
    os: {},
    browser: {},
    device: {},
    capabilities: {},
    runtime: {},
  };

  const matchVersion = (str, regex) => (str.match(regex) || [])[1] || "unknown";

  if (runningIn.node) {
    const os = require("os");
    info.environment.type = "node";
    info.runtime.name = "Node.js";
    info.runtime.version = process.versions.node;
    info.os.name = os.type();
    info.os.version = os.release();
    info.os.platform = process.platform;
    info.os.arch = process.arch;
    info.os.hostname = os.hostname();
    info.os.cpus = os.cpus().length;
    info.os.totalMemory = os.totalmem();
    info.os.freeMemory = os.freemem();
    info.capabilities.touch =
      info.capabilities.webgl =
      info.capabilities.serviceWorker =
        false;
    info.device.type = "server";
    info.device.vendor = info.device.model = "unknown";
  } else if (runningIn.browser) {
    const ua = navigator.userAgent;
    const platform = navigator.platform || "";

    info.environment.type = "browser";
    info.runtime.name = "Browser";

    // Parse OS
    if (platform.includes("Win")) {
      info.os.name = "Windows";
      info.os.version = matchVersion(ua, /Windows NT (\d+\.\d+)/);
    } else if (platform.includes("Mac")) {
      info.os.name = "macOS";
      info.os.version = matchVersion(ua, /Mac OS X (\d+[_\d]+)/).replace(
        /_/g,
        "."
      );
    } else if (platform.includes("Linux")) {
      info.os.name = "Linux";
      info.os.version = "unknown";
    } else if (platform.includes("Android")) {
      info.os.name = "Android";
      info.os.version = matchVersion(ua, /Android (\d+\.\d+)/);
    } else if (/iPhone|iPad|iPod/.test(platform)) {
      info.os.name = "iOS";
      info.os.version = matchVersion(ua, /OS (\d+[_\d]+)/).replace(/_/g, ".");
    } else {
      info.os.name = info.os.version = "unknown";
    }
    info.os.platform = platform;

    // Parse Browser
    if (runningIn.chrome) {
      info.browser.name = "Chrome";
      info.browser.version = matchVersion(ua, /Chrome\/(\d+\.\d+)/);
      info.browser.engine = "Blink";
    } else if (runningIn.firefox) {
      info.browser.name = "Firefox";
      info.browser.version = matchVersion(ua, /Firefox\/(\d+\.\d+)/);
      info.browser.engine = "Gecko";
    } else if (runningIn.safari) {
      info.browser.name = "Safari";
      info.browser.version = matchVersion(ua, /Version\/(\d+\.\d+)/);
      info.browser.engine = "WebKit";
    } else if (runningIn.edge) {
      info.browser.name = "Edge";
      info.browser.version = matchVersion(ua, /Edg\/(\d+\.\d+)/);
      info.browser.engine = "Blink";
    } else {
      info.browser.name =
        info.browser.version =
        info.browser.engine =
          "unknown";
    }

    // Device info
    info.device.type = runningIn.mobile
      ? "mobile"
      : runningIn.tablet
      ? "tablet"
      : "desktop";

    // Parse device vendor/model
    const deviceMatch = ua.match(/\(([^)]+)\)/);
    if (deviceMatch) {
      const deviceInfo = deviceMatch[1];
      if (deviceInfo.includes("iPhone")) {
        info.device.vendor = "Apple";
        info.device.model = "iPhone";
      } else if (deviceInfo.includes("iPad")) {
        info.device.vendor = "Apple";
        info.device.model = "iPad";
      } else if (deviceInfo.includes("Android")) {
        info.device.vendor = (deviceInfo.match(/(\w+);/) || [])[1] || "unknown";
        info.device.model = "Android Device";
      } else {
        info.device.vendor = info.device.model = "unknown";
      }
    } else {
      info.device.vendor = info.device.model = "unknown";
    }

    // Capabilities
    const checkCapability = (obj, prop) => {
      try {
        return typeof obj[prop] !== "undefined";
      } catch {
        return false;
      }
    };

    info.capabilities.touch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    info.capabilities.webgl = (() => {
      try {
        const canvas = document.createElement("canvas");
        return !!(window.WebGLRenderingContext && canvas.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    info.capabilities.serviceWorker = "serviceWorker" in navigator;
    info.capabilities.webRTC = "RTCPeerConnection" in window;
    info.capabilities.webAssembly = typeof WebAssembly !== "undefined";
    info.capabilities.localStorage = checkCapability(window, "localStorage");
    info.capabilities.sessionStorage = checkCapability(
      window,
      "sessionStorage"
    );
    info.capabilities.indexedDB = "indexedDB" in window;
    info.capabilities.geolocation = "geolocation" in navigator;
    info.capabilities.notifications = "Notification" in window;
  } else if (runningIn.deno) {
    info.environment.type = "deno";
    info.runtime.name = "Deno";
    info.runtime.version = Deno.version.deno;
    info.os.name = Deno.build.os;
    info.os.version = info.os.arch = "unknown";
    info.capabilities.touch =
      info.capabilities.webgl =
      info.capabilities.serviceWorker =
        false;
    info.device.type = "server";
    info.device.vendor = info.device.model = "unknown";
  } else {
    info.environment.type = "unknown";
  }

  return info;
};

/**
 * Extracts detailed information from an HTTP request object.
 * @param {object} req - The HTTP request object (Node.js req or browser Request)
 * @returns {object} An object containing extracted request information.
 */
runningIn.getRequestInfo = function (req) {
  if (!req) {
    return { error: "No request object provided" };
  }

  const info = {
    url: {},
    headers: {},
    method: "",
    protocol: "",
    client: {},
    query: {},
    body: {},
  };

  try {
    // Extract method
    info.method = req.method || "GET";

    // Extract URL information
    if (req.url) {
      const urlObj = new (runningIn.node ? require("url").URL : URL)(
        req.url,
        `http://${req.headers?.host || "localhost"}`
      );
      info.url.full = req.url;
      info.url.pathname = urlObj.pathname;
      info.url.search = urlObj.search;
      info.url.hash = urlObj.hash;
      info.url.protocol = req.protocol || urlObj.protocol.replace(":", "");

      // Parse query parameters
      const params = urlObj.searchParams;
      if (params) {
        for (const [key, value] of params) {
          info.query[key] = value;
        }
      }
    }

    // Extract headers
    if (req.headers) {
      info.headers = req.headers;
      info.headers.userAgent =
        req.headers["user-agent"] || req.headers["User-Agent"] || "";
      info.headers.host = req.headers["host"] || req.headers["Host"] || "";
      info.headers.contentType =
        req.headers["content-type"] || req.headers["Content-Type"] || "";
      info.headers.origin =
        req.headers["origin"] || req.headers["Origin"] || "";
      info.headers.referer =
        req.headers["referer"] || req.headers["Referer"] || "";
    }

    // Extract client information
    if (runningIn.node) {
      // Node.js request object
      info.client.ip =
        req.ip ||
        req.headers["x-forwarded-for"] ||
        req.connection?.remoteAddress ||
        "";
      info.client.port = req.connection?.remotePort || "";
      info.client.family = req.connection?.remoteFamily || "";
    } else if (runningIn.browser) {
      // Browser Request object
      info.client.type = "browser";
      info.client.ip = "N/A"; // Not available in browser for security reasons
    }

    // Extract body information if available
    if (req.body) {
      if (typeof req.body === "string") {
        info.body.size = req.body.length;
        info.body.type = "string";
      } else if (typeof req.body === "object") {
        info.body.size = JSON.stringify(req.body).length;
        info.body.type = typeof req.body;
        info.body.keys = Object.keys(req.body);
      }
    }

    // Extract other useful properties
    info.isSecure = req.secure || req.protocol === "https" || false;
    info.isXmlHttpRequest =
      req.headers?.["x-requested-with"] === "XMLHttpRequest" || false;
  } catch (error) {
    return { error: `Failed to extract request information: ${error.message}` };
  }

  return info;
};

// Freeze the object to prevent modification
Object.freeze(runningIn);

module.exports = runningIn;
