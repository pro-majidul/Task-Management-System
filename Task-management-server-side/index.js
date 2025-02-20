// const express = require('express');
// const cors = require('cors')
// require('dotenv').config();
// const JWT = require('jsonwebtoken');
// const port = process.env.PORT || 5000
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const app= express();
// app.use(cors())
// app.use(express.json())

// app.get('/', (req,res)=>{
//     res.send(`server is running on port ${port}`)
// })


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xihi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     // await client.connect();
//     // Send a ping to confirm a successful connection


    
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     // await client.close();
//   }
// }
// run().catch(console.dir);


// app.listen(port , (req,res)=>{
//     console.log('localhost play on port 5000')
// })

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const JWT = require("jsonwebtoken");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`Server is running on port ${port}`);
});

// MongoDB Atlas Connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xihi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: { version: ServerApiVersion.v1, strict: true, deprecationErrors: true },
});

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");

    const taskCollection = client.db("TaskManager").collection("tasks");
    const userCollection = client.db("TaskManager").collection("users");

    // **API Routes for Tasks**
    
    // Get all tasks
    app.get("/tasks", async (req, res) => {
      const tasks = await taskCollection.find().toArray();
      res.send(tasks);
    });

    //user related api
    app.put('/users',async (req,res)=>{
      const data = req.body;
      const query = {email : data.email};
      const updateDoc ={
        $set:{ ...data, 'loginTime': new Date()}
      }
      const option = {upsert : true}
      const result = await userCollection.updateOne(query,updateDoc, option)
      res.send(result)
    })

    // Add new task
    app.post("/tasks", async (req, res) => {
      const newTask = req.body;
      newTask.timestamp = new Date();
      const result = await taskCollection.insertOne(newTask);
      res.send(result);
    });

    // Update task
    app.patch("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const { _id ,...data} =  req.body
      const query ={ _id: new ObjectId(id) }
      const updatedTask = {
        $set : data
      }
      const result = await taskCollection.updateOne( query , updatedTask);
      res.send(result);
    });

    // Delete task
    app.delete("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    // Change task category (Drag & Drop)
    app.put("/tasks/:id/category", async (req, res) => {
      const id = req.params.id;
      const { category } = req.body;
      const result = await taskCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { category } }
      );
      res.send(result);
    });

  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

// Start Server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
