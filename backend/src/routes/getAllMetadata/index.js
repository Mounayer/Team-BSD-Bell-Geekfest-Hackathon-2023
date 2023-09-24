const { getAllFiles } = require("../../db/mongo/index");
const { getUserFromToken } = require("../../helpers/index");

module.exports = async function (req, res) {
  const auth_header = req.headers["authorization"];
  const idToken = auth_header.split(" ")[1];
  const payload = getUserFromToken(idToken);
  const username = payload["cognito:username"];

  try {
    res.setHeader("Content-Type", "application/json");

    res.send(await getAllFiles(username));

    //return await readData(file_name, keyid);

    // await run();
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
