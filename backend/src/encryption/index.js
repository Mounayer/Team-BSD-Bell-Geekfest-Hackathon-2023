const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

module.exports.decrypt = function (text, keyString) {
  const key = crypto
    .createHash("sha256")
    .update(String(keyString))
    .digest("base64")
    .substr(0, 32);
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted;
};

module.exports.getKMSKey = (username) => {
  const kms = new AWS.KMS();

  const keyAlias = `alias/CognitoUserKey/${username}`;

  return new Promise((resolve, reject) => {
    kms.describeKey({ KeyId: keyAlias }, (err, data) => {
      if (err) {
        console.error("Error:", err);
        reject(err);
      } else {
        let key = data.KeyMetadata.KeyId;

        resolve(key);
      }
    });
  });
};
