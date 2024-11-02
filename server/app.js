import { Server } from 'socket.io'
import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'node:http';
// import { MongoClient, ServerApiVersion } from 'mongodb'
import cors from 'cors'
import {} from 'dotenv/config'

const app = express()

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app)
const PORT = 5000

const io = new Server(server)

// middleware
// app.use("/", (req, res, next) => {
//     // res.send(`Hello world from '/'!`)
//     console.log("Middleware")
//     next()
// });

app.post("/", (req, res) => {
    // res.send(`Hello world from '/'!`)
    console.log(`POST RECEIVED FROM CLIENT, ${req.body.count}`)
    res.send("Response Received from '/'")
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`)
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected, goodby`)
    })
  })

app.post("/arduino-data", (req, res) => {
    console.log(`Arduino data received, data = ${req.body.age}`)
    res.send(`Response Received from '/arduino-data'`)
});

server.listen(PORT, '10.192.17.160', () => {
  console.log(`server is now running at ${PORT}`);
});

// Database Connection

// const client = new MongoClient(process.env.DB_URI, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// })

// async function run() {
//     try {
//       // Connect the client to the server	(optional starting in v4.7)
//       await client.connect();
//       // Send a ping to confirm a successful connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }

// run().catch(console.dir);