const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");
const {addFile} = require("../../db/mongo");
const {getFileExtension }  = require("../../helpers/index");
// const {run} = require("../../db/mongo/index");

module.exports = async function (req, res) {
  let username = req.query.username;
  let file_name = req.query.filename;

  console.log(`Username: ${username}, filename: ${file_name}`);

  try {
    let keyid = await getKMSKey(username);

    let object_name = file_name;

    if (req.dataType == "text") {
      keyid += "notes";
    } else if (req.dataType == "image") {
      keyid += "images";
      console.log("req.file:", req.file);
    } else if (req.dataType == "json") {
      keyid += "json";
    } else {
      keyid += "files";
    }

    if (req.file && req.file.buffer) {
      await writeData(object_name, keyid, req.file.buffer, req);
    } else {
      await writeData(object_name, keyid, req.body, req);
    }

    // await run();

    await addFile(username, object_name, getFileExtension(object_name), req.dataType, req.headers["content-type"]);

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.status(200).send("Added Data");
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
