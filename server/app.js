import { Server } from 'socket.io'
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'node:http';
import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import {} from 'dotenv/config'

const app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app)
// require('dotenv').config()
const PORT = 50000

const io = new Server(server)

app.use("/", (req, res) => {
    res.send(`Hello world from '/'!`)
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected, goodby`)
    })
  })

app.post("/arduino-data", (req, res) => {
//   const sensorValue = req.body.sensorValue;
//   console.log(`Received sensor value: ${sensorValue}`);
//   res.send("Data received");
    console.log(`Arduino data received, data = ${req.body}`)
});

server.listen(PORT, () => {
  console.log(`server is now running at http://localhost:${PORT}`);
});

// Database Connection

const client = new MongoClient(process.env.DB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
})

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }

run().catch(console.dir);