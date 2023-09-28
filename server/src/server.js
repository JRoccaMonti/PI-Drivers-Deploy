const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");

const server = express();

server.use(express.static(__dirname + '/public'));
server.use(express.urlencoded({ extended: true }));


server.use(morgan("dev"));
server.use(express.json());
server.use(cors());

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "https://pi-drivers-deploy.vercel.app/");
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


server.use('/',router);

server.use((err, req, res, next) => { 
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message);
});

module.exports = server;
