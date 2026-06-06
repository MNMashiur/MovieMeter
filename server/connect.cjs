const {MongoClient} = require('mongodb');

require('dotenv').config({path: './config.env'});
console.log("ENV LOADED:", process.env.ATLAS_URI);

async function main() {

    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    try {
        await client.connect();
        console.log("Connected to MongoDB");

        const collections = await client.db("MovieMeter").collections();

        collections.forEach(col => console.log(col.collectionName));

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
