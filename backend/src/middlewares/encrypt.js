const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const crypto = require("crypto");
const util = require("util");

dotenv.config();

module.exports = function encrypt(text, keyString) {
  const algorithm = "aes-256-cbc";
  const key = crypto
    .createHash("sha256")
    .update(String(keyString))
    .digest("base64")
    .substr(0, 32);
  const iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
};

async function encryptStuff(req, res, next) {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  const kms = new AWS.KMS();
  const describeKeyPromise = util.promisify(kms.describeKey).bind(kms);

  const keyAlias = `alias/CognitoUserKey/${req.query.username}`;

  try {
    const data = await describeKeyPromise({ KeyId: keyAlias });
    let key = data.KeyMetadata.KeyId;

    console.log(`Key for user: ${key}`);
    console.log(`Title before encryption: ${req.body.title}`);
    console.log(`Description before encryption: ${req.body.description}`);

    // encrypt stuff
    req.body.title = encrypt(req.body.title, key);
    req.body.description = encrypt(req.body.description, key);

    next();
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Encryption error");
  }
}
