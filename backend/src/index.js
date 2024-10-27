const express = require("express");
const cors = require("cors");
const { ParseServer } = require("parse-server");
const ParseDash = require("parse-dashboard");
const logger = require("./logger");
const { Cloud } = require("parse");

const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();

const appId = "appId";
const javascriptKey = "jskey";
const appName = "appName";
const serverURL = "http://localhost:1337/rest";
const masterKey = "masterkey";
const server = new ParseServer({
  databaseURI: "mongodb://localhost:27017/parse-server",
  appId,
  restAPIKey: "apikey",
  cloud: "./src/clouds/index.js",
  masterKey,
  javascriptKey,
  port: 1337,
  mountPath: "/rest",
  directAccess: true,
  enforcePrivateUsers: true,
  allowClientClassCreation: true,
  enableAnonymousUsers: true,
  preventLoginWithUnverifiedEmail: true,
  allowPublic: true,
  appName,
});

const options = { allowInsecureHTTP: true };

const dashboard = new ParseDash(
  {
    apps: [
      {
        masterKey,
        serverURL,
        appId,
        appName,
        javascriptKey,
      },
    ],
    users: [
      {
        user: "admin",
        pass: "admin",
        apps: [{ appId, masterKey }],
      },
    ],
  }
  //options
);

app.use("/rest", server);
app.use("/dash", dashboard);

app.listen(1337, async function () {
  logger.info("parse-server running on port 1337.");
});
