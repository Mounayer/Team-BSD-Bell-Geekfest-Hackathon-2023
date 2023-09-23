const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ storage: multer.memoryStorage() });

function handleData(req, res, next) {
  const contentType = req.headers["content-type"];

  if (contentType.startsWith("text/")) {
    req.dataType = "text";
    bodyParser.text()(req, res, next); // Process the incoming text
  } else if (contentType === "application/json") {
    req.dataType = "json";
    try {
      req.body = JSON.stringify(req.body);
      next(); // Continue to the next middleware or route
    } catch (err) {
      return res.status(400).send("Error processing JSON data.");
    }
  } else if (
    contentType === "multipart/form-data" ||
    contentType.startsWith("image/")
  ) {
    if (contentType.startsWith("image/")) {
      req.dataType = "image";
    } else {
      req.dataType = "file";
    }
    // Use multer to handle file uploads and images
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).send("Error processing file upload.");
      }
      // For file or image, transform the body to be the file buffer
      if (req.file) {
        req.body = req.file.buffer;
      }
      next(); // Continue to the next middleware or route
    });
  } else {
    return res.status(400).send("Unsupported content type");
  }
}

module.exports = handleData;
