const { getKMSKey } = require("../../encryption/index");
const { deleteData } = require("../../db/index");
const { deleteFile } = require("../../db/mongo/index");
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
  console.log(`uname: ${uname}`); // Should print the username, e.g., "fahim"

  console.log(`Username: ${username}, filename: ${file_name}`);

  try {
    let keyid = await getKMSKey(username);

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

    console.log(`Username: ${username}, KeyID: ${keyid}`);

    //res.setHeader('Content-Type', contentType);

    res.setHeader("Content-Disposition", "attachment; filename=" + file_name);

    await deleteData(file_name, keyid);

    //return await readData(file_name, keyid);

    await deleteFile(username, file_name);

    // await run();

    res.status(200).send(`Successfully deleted ${username}'s data`);
  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
