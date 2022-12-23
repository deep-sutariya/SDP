const express = require('express');
const app = express();
const PORT = 5000;

const connectDB = require('./db/db');
const userinfo = require('./model/userinfo');
connectDB();

const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(require('./route/auth'));

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})