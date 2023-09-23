const { getKMSKey } = require("../../encryption/index");
const { readData } = require("../../db/index");
const {getFileExtension }  = require("../../helpers/index");
// const {run} = require("../../db/mongo/index");

module.exports = async function (req, res) {
  let username = req.query.username;
  let file_name = req.query.filename;
  let dataType = req.query.dataType;
  let contentType = req.query.contentType;



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
    
    res.setHeader('Content-Disposition', 'attachment; filename=' + file_name);


    res.send(await readData(file_name, keyid));

    //return await readData(file_name, keyid);

    // await run();

  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
