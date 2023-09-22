const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");

module.exports = async function (req, res) {
  let username = req.query.username;

  try {
    let keyid = await getKMSKey(username);

    await writeData(username, keyid);

    //res.status(200);
  } catch (err) {
    res.status(400).send("Unable to process request");
  }
};
