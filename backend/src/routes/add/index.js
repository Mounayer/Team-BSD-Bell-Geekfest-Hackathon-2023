const { getKMSKey } = require("../../encryption/index");
const { writeData } = require("../../db/index");
const { addFile } = require("../../db/mongo");
const { getFileExtension } = require("../../helpers/index");
const encrypt = require("../../middlewares/encrypt");
const { getUserFromToken } = require("../../helpers/index");

module.exports = async function (req, res) {
  const auth_header = req.headers["authorization"];
  const idToken = auth_header.split(" ")[1];
  const payload = getUserFromToken(idToken);
  const username = payload["cognito:username"];

  let file_name = req.query.filename;

  console.log(`Username: ${username}, filename: ${file_name}`);

  try {
    let keyid = await getKMSKey(username);
    let original_keyid = keyid;

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

    // if (req.file && req.file.buffer) {

    //   await writeData(object_name, keyid, req.file.buffer, req);
    // } else {
    //   await writeData(object_name, keyid, req.body, req);
    // }

    // Testing for encryption
    // Steps:
    //  - stringify
    //  - encrypt
    //  - stringify

    // Steps for decryption
    // - parseJSON
    // - decrypt
    // - parseJSON
    if (req.file && req.file.buffer) {
      await writeData(
        object_name,
        keyid,
        JSON.stringify(encrypt(req.file.buffer, original_keyid)),
        req
      );
    } else {
      await writeData(
        object_name,
        keyid,
        JSON.stringify(encrypt(req.body, original_keyid)),
        req
      );
    }

    // await run();

    await addFile(
      username,
      object_name,
      getFileExtension(object_name),
      req.dataType,
      req.headers["content-type"]
    );

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.status(200).send("Added Data");
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
