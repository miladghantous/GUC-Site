const express = require("express")
const path = require('path');
const server = express();
const dotenv = require("dotenv").config();
const connectToDb = require("./configuration/Db");
const {ErrorHandler} = require('./middleware/ErrorHandler')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.json());

server.listen(port,() => console.log(`Server is listening on port ${port}`))
connectToDb()

// Routes
const instructorRoutes = require('./routes/InstructorRoute')
const conferenceRoutes = require('./routes/ConferenceRoute')
const fundRoutes = require('./routes/FundRoute')
const adminRoutes = require('./routes/AdminRoute')
const announcementRoutes = require('./routes/AnnouncementRoute')
const filelinkRoutes = require('./routes/FileLinkRoute')


// APIs
server.use('/api/instructor',instructorRoutes)
server.use('/api/conference',conferenceRoutes)
server.use('/api/fund',fundRoutes)
server.use('/api/admin',adminRoutes)
server.use('/api/announcement',announcementRoutes)
server.use('/api/filelink',filelinkRoutes)


server.use(ErrorHandler)