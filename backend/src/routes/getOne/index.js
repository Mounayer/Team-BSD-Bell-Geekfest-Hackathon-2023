const { getKMSKey } = require("../../encryption/index");
const { readData } = require("../../db/index");
const { getFileExtension } = require("../../helpers/index");
const { decrypt } = require("../../encryption/index");
const { getUserFromToken } = require("../../helpers/index");
// const {run} = require("../../db/mongo/index");

module.exports = async function (req, res) {
  let file_name = req.query.filename;
  let dataType = req.query.dataType;
  let contentType = req.query.contentType;

  const auth_header = req.headers["authorization"];
  const idToken = auth_header.split(" ")[1];
  const payload = getUserFromToken(idToken);
  const username = payload["cognito:username"];

  console.log(`Username: ${username}, filename: ${file_name}`);

  try {
    let keyid = await getKMSKey(username);

    let originalid = keyid;

    if (dataType == "text") {
      keyid += "notes";
    } else if (dataType == "image") {
      keyid += "images";
      console.log("req.file:", req.file);
    } else if (dataType == "json") {
      keyid += "json";
    } else {
      keyid += "files";
    }

    // Steps for decryption
    // - parseJSON
    // - decrypt
    // - parseJSON

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    res.setHeader("Content-Type", contentType);

    res.setHeader("Content-Disposition", "attachment; filename=" + file_name);

    // decryption test

    // let encrypted_data = await readData(file_name, keyid);

    // encrypted_data = JSON.parse(encrypted_data);

    // let decrypted_data = decrypt(encrypted_data, originalid);

    // decrypted_data = JSON.parse(decrypted_data);

    // res.status(200).send(decrypted_data);

    let encrypted_data = await readData(file_name, keyid);
    encrypted_data = JSON.parse(encrypted_data);
    let decrypted_data = decrypt(encrypted_data, originalid);
    res.status(200).send(decrypted_data);

    //

    //res.status(200).send(await readData(file_name, keyid));

    //return await readData(file_name, keyid);

    // await run();
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};