const Express = require("express");
const dotenv = require("dotenv");
const encrypt = require("../middlewares/encrypt");
const { authenticate } = require("../authentication/index");

dotenv.config();

const router = Express.Router();

router.get("/", authenticate(), (req, res) => {
  res.status(200).send(`Health is good!`);
});

module.exports.router = router;
