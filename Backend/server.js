const connectDB = require('./db/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require("http");
const cors = require('cors');

const PORT = 5000;

const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors:{
        origin: "*"
    }
});

//   event V      
io.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	// on connection join all the connected users to my-room for notifications

	socket.on("disconnect", () => {
		console.log(` X : ${socket.id} user just disconnected!`);
		socket.disconnect();
	});

    socket.on("statusupdated",(payload) => {
        console.log(payload);
        io.emit("load-resources",{
            message: "success"
        });
    })

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

connectDB();

app.use(cookieParser());

app.use(require('./route/auth'));
require('events').EventEmitter.defaultMaxListeners = 3;



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})