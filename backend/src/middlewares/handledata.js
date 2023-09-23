// const multer = require("multer");
// const bodyParser = require("body-parser");
// const upload = multer({ storage: multer.memoryStorage() });

// function handleData(req, res, next) {
//   const contentType = req.headers["content-type"];

//   if (contentType.startsWith("text/")) {
//     req.dataType = "text";
//     bodyParser.text()(req, res, next);
//   } else if (contentType === "application/json") {
//     req.dataType = "json";
//     bodyParser.json()(req, res, next);
//   } else if (contentType.startsWith("image/")) {
//     req.dataType = "image";
//     let data = [];
//     req.on("data", (chunk) => {
//       data.push(chunk);
//     });
//     req.on("end", () => {
//       if (data.length > 0) {
//         req.body = Buffer.concat(data);
//       }
//       next();
//     });
//   } else if (contentType.startsWith("multipart/form-data")) {
//     req.dataType = "file";
//     upload.single("file")(req, res, (err) => {
//       if (err) {
//         return res.status(400).send("Error processing file upload.");
//       }
//       if (req.file) {
//         req.body = req.file.buffer;
//       }
//       next();
//     });
//   } else {
//     console.log("Unsupported content");
//     return res.status(400).send("Unsupported content type");
//   }
// }

// module.exports = handleData;

const multer = require("multer");
const bodyParser = require("body-parser");
const upload = multer({ storage: multer.memoryStorage() });

function handleData(req, res, next) {
  const contentType = req.headers["content-type"];

  if (contentType.startsWith("text/")) {
    req.dataType = "text";
    bodyParser.text()(req, res, next);
  } else if (contentType === "application/json") {
    req.dataType = "json";
    bodyParser.json()(req, res, next);
  } else if (
    contentType.startsWith("image/") ||
    contentType === "application/octet-stream"
  ) {
    if (contentType.startsWith("image/")) {
      req.dataType = "image";
    } else {
      req.dataType = "file";
    }

    let data = [];
    req.on("data", (chunk) => {
      data.push(chunk);
    });
    req.on("end", () => {
      if (data.length > 0) {
        req.body = Buffer.concat(data);
      }
      next();
    });
  } else if (contentType.startsWith("multipart/form-data")) {
    req.dataType = "multipart";
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res.status(400).send("Error processing file upload.");
      }
      if (req.file) {
        req.body = req.file.buffer;
      }
      next();
    });
  } else {
    console.log("Unsupported content");
    return res.status(400).send("Unsupported content type");
  }
}

module.exports = handleData;
