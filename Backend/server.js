const express = require('express');
const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const http = require("http");
const cors = require('cors');

const PORT = 5000;

const app = express();

// creating a server
// JellyFish Theme 
// const server = http.createServer(app);

// const io = new Server(server,{
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET","POST"]
//   }
// });

const connectDB = require('./db/db');
connectDB();

app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));


app.use(cookieParser());

app.use(express.json());

app.use(require('./route/auth'));
require('events').EventEmitter.defaultMaxListeners = 3;

//   event V      
// io.on("connect", (socket) => {
//   console.log("connected hahs");
//   socket.on("changeinstatus",(payload)=>{
//     console.log(payload);
//     socket.broadcast.timeout(1000).emit("statuschanged",payload);
//   })
// });


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})