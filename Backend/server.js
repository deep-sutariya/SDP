const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

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

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})