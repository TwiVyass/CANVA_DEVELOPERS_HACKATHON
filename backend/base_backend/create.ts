import * as express from "express";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";
import debug from "debug";

const serverDebug = debug("server");

interface BaseServer {
  app: express.Express;
  start: (address: number | string | undefined) => void;
}

export function createBaseServer(router: express.Router): BaseServer {
  const SHOULD_ENABLE_HTTPS = process.env.SHOULD_ENABLE_HTTPS === "true";
  const HTTPS_CERT_FILE = process.env.HTTPS_CERT_FILE;
  const HTTPS_KEY_FILE = process.env.HTTPS_KEY_FILE;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  // Disable 'x-powered-by' header
  app.disable("x-powered-by");

  // Health check endpoint
  app.get("/healthz", (req, res) => {
    res.sendStatus(200);
  });

  // Logging middleware
  app.use((req, res, next) => {
    serverDebug(`${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
  });

  // Custom routes
  app.use(router);

  // Catch-all route for unhandled requests
  app.all("*", (req, res) => {
    res.status(404).send({
      error: `Unhandled '${req.method}' on '${req.url}'`,
    });
  });

  let server;
  if (SHOULD_ENABLE_HTTPS) {
    if (!HTTPS_CERT_FILE || !HTTPS_KEY_FILE) {
      throw new Error(
        "SSL certificates not provided. Please set HTTPS_CERT_FILE and HTTPS_KEY_FILE environment variables."
      );
    }

    server = https.createServer(
      {
        key: fs.readFileSync(HTTPS_KEY_FILE),
        cert: fs.readFileSync(HTTPS_CERT_FILE),
      },
      app
    );
  } else {
    server = http.createServer(app);
  }

  return {
    app,
    start: (address: number | string | undefined) => {
      console.log(`Listening on '${address}'`);
      server.listen(address, () => {
        serverDebug(`Server started on '${address}'`);
      });
      process.on("SIGTERM", () => {
        serverDebug("SIGTERM signal received: closing HTTP server");
        server.close(() => {
          serverDebug("HTTP server closed");
        });
      });
    },
  };
}
