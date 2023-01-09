const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5000;

const connectDB = require('./db/db');
connectDB();

const userinfo = require('./model/userinfo');

const cors = require('cors');
app.use(cors());

app.use(cookieParser());

app.use(express.json());

app.use(require('./route/auth'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})