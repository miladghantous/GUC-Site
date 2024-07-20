const express = require("express")
const path = require('path');
const server = express();
const dotenv = require("dotenv").config();
const connectToDb = require("./configuration/Db");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.json());

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectToDb()

const instructorRoutes = require('./routes/InstructorRoute')

server.use('/api/instructor',instructorRoutes)


// server.use(errorHandler)