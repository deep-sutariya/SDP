const connectDB = require('./db/db');
const express = require('express');
const cookieParser = require('cookie-parser');
const http = require("http");
const cors = require('cors');
const Restaurantinfo = require("./model/restaurantInfo");

const PORT = 5000;

const app = express();

app.set("view engine", "ejs");

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
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

    socket.on("statusupdated", (payload) => {
        io.emit("load-resources", {
            message: "success"
        });
    })

});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use(cookieParser());

app.use(require('./route/auth'));

require('events').EventEmitter.defaultMaxListeners = 10;


// <----- Midnight Reset ------> //
const schedule = require('node-schedule');

// schedule.scheduleJob("sec(optional) min hour day-in-month month day-in-week")
schedule.scheduleJob("0 0 * * *",  async()=> {
    console.log("Resetting at 00:00 everyday");

    const data = await Restaurantinfo.find({});
    data.forEach(async (element) => {

        let n = parseInt(element.rtableno);
        for (let i = 0; i < 24; ++i) {
            element.rtable[i] = n;
        }
        await element.save();
    })
});



server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})