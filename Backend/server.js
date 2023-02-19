const express = require('express');
const cookieParser = require('cookie-parser');
const http = require("http");

const PORT = 5000;

const app = express();

// creating a server
const server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server,{
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET","POST"]
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
require('events').EventEmitter.defaultMaxListeners = 15;

//   event V      
io.on("connection", (socket) => {
  console.log("connected");
    const payload = {
        message: "hey how are you get ready with socket"
    }
  socket.on("changeinstatus",(payload)=>{
    console.log(payload);

    io.emit("statuschanged",{message: "statuschanged"});
  })
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})