// server for front end
const express = require('express');

const app = express();


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


const PORT = 3001;
const server = app.listen(PORT, () => console.log(`Example app listening on port ${PORT}! http://localhost:3001`));
process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`);
    server.close(() => process.exit(1));
})