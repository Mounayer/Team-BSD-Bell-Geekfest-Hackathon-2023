const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");

module.exports = async function (req, res) {
  let username = req.query.username;
  let file_name = req.query.filename;

  try {
    let keyid = await getKMSKey(username);

    let object_name = file_name;

    if (req.dataType == "text") {
      keyid += "notes";
    } else if (req.dataType == "image") {
      keyid += "images";
    } else if (req.dataType == "json") {
      keyid += "json";
    } else {
      keyid += "files";
    }

    await writeData(object_name, keyid, req.body);

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.status(200).send("Added Data");
  } catch (err) {
    res.status(400).send("Unable to process request");
  }
};
