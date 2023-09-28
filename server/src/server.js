const express = require("express");
const router = require("./routes");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

const server = express();

server.use(express.static(__dirname + '/public'));

server.use(morgan("dev"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use('/',router);

module.exports = server;
