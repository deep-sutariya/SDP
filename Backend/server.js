const express = require('express');
const cookieParser = require('cookie-parser');
const http = require("http");

const PORT = 5000;

const app = express();

// creating a server
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,{
  cors:{
    origin: "*"
  }
});

const connectDB = require('./db/db');
connectDB();

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const cors = require('cors');
app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(require('./route/auth'));

//   event V      
io.on("connection", (socket) => { 
  console.log("Socket is active to be connected");
    const payload = {
        message: "hey how are you get ready with socket"
    }
  io.emit("chat", payload);
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})