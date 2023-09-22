const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const { strategy } = require("./src/authentication");
const cors = require("cors");
const bodyParser = require("body-parser");
const { router } = require("./src/routes");
const stoppable = require("stoppable");
const compression = require("compression");

passport.use(strategy());
app.use(compression());
app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());

// Parse URL-encoded bodies for HTML form submissions
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

const HTTP_PORT = process.env.PORT || 8080;

const server = stoppable(
  app.listen(HTTP_PORT, () => {
    console.log("Server running on:", HTTP_PORT);
  })
);

// stops server gracefully
server;
