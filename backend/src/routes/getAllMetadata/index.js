
const { getAllFiles } = require("../../db/mongo/index");

module.exports = async function (req, res) {
  let username = req.query.username;


  try {

    res.setHeader('Content-Type', 'application/json');

    res.send(await getAllFiles(username));

    //return await readData(file_name, keyid);

    // await run();

  } catch (err) {
    console.log(err);
    res.status(400).send("Unable to process request");
  }
};
