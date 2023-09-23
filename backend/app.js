const express = require("express");
const app = express();
const helmet = require("helmet");
app.use(helmet());
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const { strategy } = require("./src/authentication");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("./src/routes");
const stoppable = require("stoppable");
const compression = require("compression");
const https = require("https");
const fs = require("fs");

const privateKey = fs.readFileSync("./src/scripts/key.pem", "utf8");
const certificate = fs.readFileSync("./src/scripts/cert.pem", "utf8");

passport.use(strategy());
app.use(compression());
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());

// Parse URL-encoded bodies for HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

// const HTTP_PORT = process.env.PORT || 8080;

// const server = stoppable(
//   app.listen(HTTP_PORT, () => {
//     console.log("Server running on:", HTTP_PORT);
//   })
// );

const credentials = { key: privateKey, cert: certificate };
const HTTPS_PORT = process.env.HTTPS_PORT || 8080; // Using 8443 as a common default for HTTPS in local development

const server = stoppable(
  https.createServer(credentials, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on: ${HTTPS_PORT}`);
  })
);

// stops server gracefully
server;
