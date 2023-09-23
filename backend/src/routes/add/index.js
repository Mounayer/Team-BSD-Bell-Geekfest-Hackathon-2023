const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");

module.exports = async function (req, res) {
  let username = req.query.username;

  try {
    let keyid = await getKMSKey(username);

    let object_name = "blyat";

    if (req.dataType == "text") {
      object_name = "text";
      keyid += "notes";
    } else if (req.dataType == "image") {
      object_name = "image";
      keyid += "images";
    } else if (req.dataType == "json") {
      object_name = "json";
      keyid += "json";
    } else {
      object_name = "file";
      keyid += "files";
    }

    await writeData(object_name, keyid, req.body);

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.status(200).send("Added Data");
  } catch (err) {
    res.status(400).send("Unable to process request");
  }
};
