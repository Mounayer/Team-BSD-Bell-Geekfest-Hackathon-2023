const { MongoClient , ServerApiVersion } = require("mongodb");
const  dotenv  = require("dotenv");

dotenv.config();

const uri = process.env.MONGO_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const databaseName = process.env.DATABASE_NAME;
    const db = client.db(databaseName);
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    return db.collection("users");
    
  } catch(err) {
    console.log(err);
  }
}


module.exports.addFile = async function(userName, filename, fileextension, datatype, contenttype)
{
    try
    {

        let doc = {
            username: userName,
            file_name: filename,
            file_extension:  fileextension,
            data_type: datatype,
            content_type: contenttype
        }

        let collection = await run();

        

        const options = { upsert: true };

        await collection.replaceOne({ username: userName, file_name: filename }, doc, options);

        return Promise.resolve();
    }
    catch(err)
    {
        console.log(err);
        return Promise.reject("Unable to addFile");
    }
}

module.exports.getAllFiles = async function(userName)
{
    try
    {
        let collection = await run();

        let allFiles =  await collection.find({username: userName}).toArray();

        return Promise.resolve(allFiles);
    }
    catch(err)
    {
        console.log(err);
        return Promise.reject("Unable to get AllFiles");
    }
}

module.exports.deleteFile = async function(userName, filename)
{

    try
    {
        let collection = await run();

        await collection.deleteOne({username: userName, file_name: filename});

        return Promise.resolve();
    }
    catch(err)
    {
        console.log(err);
        return Promise.reject("Unable to delete File");
    }
}