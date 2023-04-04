require('dotenv').config({path:"./config/config.env"});
const express = require('express');
const connectDB = require("./config/db");

const app = express();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./route/apidata'));


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})