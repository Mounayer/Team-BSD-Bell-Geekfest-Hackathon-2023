const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");

module.exports = async function (req, res) {
  let username = req.query.username;

  try {
    let keyid = await getKMSKey(username);

    let array = ["Hello World", "Hey bro", "Hey Dude"];

    await writeData("notes", keyid, JSON.stringify(array));

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.status(200).send("Added Data");
  } catch (err) {
    res.status(400).send("Unable to process request");
  }
};
