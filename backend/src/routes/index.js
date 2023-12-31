const Express = require("express");
const dotenv = require("dotenv");
const encrypt = require("../middlewares/encrypt");
const { authenticate } = require("../authentication/index");
const add = require("./add/index");
const handleData = require("../middlewares/handledata");
const getOne = require("./getOne/index");
const getAllMetadata = require("./getAllMetadata/index");

dotenv.config();

const router = Express.Router();

router.get("/", authenticate(), (req, res) => {
  res.status(200).send(`Health is good!`);
});

//router.post("/add", authenticate(), add);
router.post("/add", authenticate(), handleData, add);

//router.post("/add", authenticate(), add);
router.get("/getone", authenticate(), getOne);

//router.post("/add", authenticate(), add);
router.get("/getalluserfiles", authenticate(), getAllMetadata);

module.exports.router = router;
