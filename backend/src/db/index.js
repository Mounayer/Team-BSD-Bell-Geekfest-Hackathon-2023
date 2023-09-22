const s3Client = require("./s3Client");
const {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

/**
 * Writes a fragment's data to an S3 Object in a Bucket
 * https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/s3-example-creating-buckets.md#upload-an-existing-object-to-an-amazon-s3-bucket
 * @returns {Promise}
 */
async function writeData(object_name, keyid, data) {
  // S3 Put Params
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    // Our key will be a mix of the ownerID and fragment id, written as a path
    Key: `${keyid}/${object_name}`,
    Body: data,
  };

  // Create a PUT Object command to send to S3
  const command = new PutObjectCommand(params);

  try {
    // Use our client to send the command
    await s3Client.send(command);
  } catch (err) {
    const { Bucket, Key } = params;
    console.error({ err, Bucket, Key }, "Error uploading fragment data to S3");
    throw new Error("unable to upload fragment data");
  }
}

/**
 * Convert a stream of data into a Buffer, by collecting
 * chunks of data until finished, then assembling them together.
 * We wrap the whole thing in a Promise so it's easier to consume.
 * Reads a fragment's data from S3
 * @returns {Promise<Buffer>}
 */
const streamToBuffer = (stream) =>
  new Promise((resolve, reject) => {
    // As the data streams in, we'll collect it into an array.
    const chunks = [];

    // When there's data, add the chunk to our chunks list
    stream.on("data", (chunk) => chunks.push(chunk));
    // When there's an error, reject the Promise
    stream.on("error", reject);
    // When the stream is done, resolve with a new Buffer of our chunks
    stream.on("end", () => resolve(Buffer.concat(chunks)));
  });

/**
 * https://github.com/awsdocs/aws-sdk-for-javascript-v3/blob/main/doc_source/s3-example-creating-buckets.md#getting-a-file-from-an-amazon-s3-bucket
 * Reads a fragment's data from S3
 * @returns {Promise<Buffer>}
 */
async function readData(object_name, keyid) {
  // S3 Put Parameters
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    // Our key will be a mix of the ownerID and fragment id, written as a path
    Key: `${keyid}/${object_name}`,
  };

  // Create a GET Object command to send to S3
  const command = new GetObjectCommand(params);

  try {
    // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
    const data = await s3Client.send(command);
    // Convert the ReadableStream to a Buffer
    return streamToBuffer(data.Body);
  } catch (err) {
    const { Bucket, Key } = params;
    console.error(
      { err, Bucket, Key },
      "Error streaming fragment data from S3"
    );
    throw new Error("unable to read fragment data");
  }
}

/*** Delete a fragment's metadata and data from S3 and DynamoDB. Returns a Promise*/
async function deleteData(object_name, keyid) {
  // S3 Delete Params
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: `${keyid}/${object_name}`,
  };

  const command = new DeleteObjectCommand(params);

  try {
    // Send command to S3
    await s3Client.send(command);
  } catch (err) {
    const { Bucket, Key } = params;
    console.error(
      { err, Bucket, Key },
      "Error deleting fragment data from  S3"
    );
    throw new Error("unable to delete fragment data");
  }
}

module.exports.writeData = writeData;
module.exports.readData = readData;
module.exports.deleteData = deleteData;
