const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const {} = require("mongodb");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//Middleware
const corsOptions = {
  origin: "https://bloodcare-bangladesh.web.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://bloodcare-bangladesh.web.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://bloodcare-bangladesh.web.app"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const uri = `mongodb+srv://${process.env.BD_USER}:${process.env.DB_PASS}@bloodcare-bd.gduqg86.mongodb.net/?retryWrites=true&w=majority`;

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
    // Connect the client to the server	(optional starting in v4.7)
    client.connect();

    const database = client.db("userDB");
    const userCollections = database.collection("users");
    const donorCollection = client.db("userDB").collection("donors");

    app.get("/donors", async (req, res) => {
      const query = {};
      const cursor = donorCollection.find(query);
      const donors = await cursor.toArray();
      res.send(donors);
    });

    app.post("/user", async (req, res) => {
      const user = req.body;
      console.log("new user added:", user);
      const result = await userCollections.insertOne(user);
    });

    app.post("/donor", async (req, res) => {
      const donor = req.body;
      console.log("added new Donor:", donor);
      const result = await donorCollection.insertOne(donor);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.log);

app.get("/", (req, res) => {
  res.send("server is running for blood management....!");
});

app.options("*", cors(corsOptions));

app.listen(port, () => {
  console.log(`Curd server is running on port ${port}`);
});
