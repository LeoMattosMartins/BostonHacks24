import { Server } from "socket.io";
import express from "express";
import bodyParser from "body-parser";
import { createServer } from "node:http";
import { MongoClient, ServerApiVersion } from "mongodb";
import cors from "cors";
import {} from "dotenv/config";
import * as jose from "jose";

const app = express();
// REQUIRES .env file with specific DB_URI, SECRET_KEY and IP in order to work
let playerSocket;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app);
const PORT = 5000;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}, password: ${password}`);
  const result = await getUser(username, password);
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  if (result) {
    const token = await new jose.SignJWT({
      username: username,
      password: password,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("6h")
      .sign(secret);
    res.status(200).json({ success: true, token: token, username: username });
    res.redirect('/')
  } else {
    res.status(401).json({ success: false, reason: "User not Found" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  console.log(`username: ${username}, password: ${password}`);
  const result = await getUser(username, password);
  const secret = new TextEncoder().encode(process.env.SECRET_KEY);
  if (!result) {
    createUser(username, password);
    const token = await new jose.SignJWT({
      username: username,
      password: password,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("6h")
      .sign(secret);
    res.status(200).json({ success: true, token: token, username: username });
    res.redirect('/')
  } else {
    res.status(401).json({ success: false, reason: "User already exists" });
  }
});
app.post("/arduino-data", (req, res) => {
  console.log(`Arduino data received, data = ${req.body.count}`);
  res.send(`Response Received from '/arduino-data'`);
  playerSocket.emit("rep", req.body.count);
});

// middleware
// app.use("/", (req, res, next) => {
//     // res.send(`Hello world from '/'!`)
//     console.log("Middleware")
//     next()
// });

app.post("/", (req, res) => {
  res.send("Response Received from '/'");
  playerSocket.emit("rep", req.body.count);
});

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected`);
  playerSocket = socket;
  playerSocket.emit("rep", 2);
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected, goodby`);
  });
});

server.listen(PORT, () => {
  console.log(`server is now running at ${PORT}`);
});

// Database Connection

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(`Error with error ${error}`);
  }
  // } finally {
  //   // Ensures that the client will close when you finish/error
  //   console.log("gonna close")
  //   await client.close();
  // }
}

async function getUser(username, password) {
  try {
    const db = client.db("users");
    const collection = db.collection("accounts");
    const user = await collection.findOne({ username, password });

    if (user) {
      console.log(`User found`);
      return true;
    } else {
      console.log(`No User found`);
      return false;
    }
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    return false;
  }
}

async function getStats(username) {
  try {
    const db = client.db("users");
    const collection = db.collection("accounts");
    const filter = { username: username };
    const options = {
      projection: {
        spaceship: 1,
        highscore: 1,
        _id: 0,
      },
    };
    const results = await collection.findOne(filter, options);
    return results
  } catch (err) {
    console.error(`Error finding user: ${err}`);
  }
}
async function editUser(spaceship, highscore, username) {
  try {
    const db = client.db("users");
    const collection = db.collection("accounts");
    const filter = { username: username };
    const update = {
      $set: {
        spaceship: spaceship,
        highscore: highscore,
      },
    };
    await collection.updateOne(filter, update);

    console.log(`Updated User ${username}`);
  } catch (err) {
    console.error(`Error finding user: ${err}`);
  }
}
async function createUser(username, password) {
  try {
    const db = client.db("users");
    const collection = db.collection("accounts");
    const user = await collection.insertOne({
      username: username,
      password: password,
    });

    console.log(
      `New document created with the following id: ${user.insertedId}`
    );
  } catch (err) {
    console.error(`Error finding user: ${err}`);
    return false;
  }
}

run().catch(console.dir);
