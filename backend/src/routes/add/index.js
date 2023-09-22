const { getKMSKey } = require("../../encryption/index");

module.exports = async function (req, res) {
  let username = req.query.username;

  try {
    let keyid = await getKMSKey(username);

    //res.status(200);
  } catch (err) {
    res.status(400).send("Unable to process request");
  }
};
