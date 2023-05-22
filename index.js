const express = require('express');
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());


console.log(process.env.DB_USER);

// MongoDB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pf5eojy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server
    client.connect();

    const toyCollection = client.db('toyNestopia').collection('allToys');

    // Get data from database //
    app.get('/allToys', async (req, res) => {

      const results = await toyCollection.find().toArray();
      res.send(results);
    });


    app.get('/toys/:id', async (req, res) => {
      const id = req.params.id;

      const query = { _id: new ObjectId(id) }

      const options = {

        projection: { name: 1, seller_name: 1, sub_category: 1, available_quantity: 1, detail_description: 1 },
      };

      const result = await toyCollection.findOne(query, options);
      res.send(result);
    });

    // Send data from client to datababe //

    app.post('/allToys', async (req, res) => {
      const addToy = req.body;
      console.log(addToy);
      const result = await toyCollection.insertOne(addToy);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('ToyNastopia start playing....');
});

app.listen(port, () => {
  console.log(`ToyNastopia is running on port: ${port}`);
});
