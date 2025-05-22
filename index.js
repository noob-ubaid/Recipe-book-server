const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const port = process.env.PORT || 3000;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@ubaid-database.njfi7n5.mongodb.net/?retryWrites=true&w=majority&appName=Ubaid-Database`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const dataBase = client.db("usersdb");
    const usersCollection = dataBase.collection("recipe-book");
    // get method
    app.get("/addrecipes", async (req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get("/addrecipes/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });
    // post method
    app.post("/addrecipes", async (req, res) => {
      const newRecipe = req.body;
      const result = await usersCollection.insertOne(newRecipe);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello World!");
});
// assignment-10     7cu#Rek_a-R6fy_
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
