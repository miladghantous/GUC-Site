const express = require("express");
const path = require("path");
const server = express();
const dotenv = require("dotenv").config();
const connectToDb = require("./configuration/Db");
const { ErrorHandler } = require("./middleware/ErrorHandler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const port = process.env.PORT;
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.json());

const cors = require("cors");
//---------
// Put it back if my solution doesnt work:
//server.use(cors({ origin: process.env.FRONT, credentials: true }));
server.use(cors({ origin: process.env.FRONT}));

// NEW line added by milad:
//server.use(cors());
//-------------------
connectToDb();
const httpServer = require("http").createServer(server);
httpServer.listen(port, () =>
  console.log(`Http server is listening on port ${port}`)
);

// Routes
const instructorRoutes = require("./routes/InstructorRoute");
const conferenceRoutes = require("./routes/ConferenceRoute");
const fundRoutes = require("./routes/FundRoute");
const adminRoutes = require("./routes/AdminRoute");
const announcementRoutes = require("./routes/AnnouncementRoute");
const filelinkRoutes = require("./routes/FileLinkRoute");
const evaluationformRoutes = require("./routes/EvaluationFormRoute");
const complaintRoutes = require("./routes/ComplaintRoute");
const userRoutes = require("./routes/UserRoute");
const taRoutes = require("./routes/TaRoute");
const questionAnswerRoutes = require("./routes/QuestionAnswerRoute")

// APIs
server.use("/api/instructor", instructorRoutes);
server.use("/api/conference", conferenceRoutes);
server.use("/api/fund", fundRoutes);
server.use("/api/admin", adminRoutes);
server.use("/api/announcement", announcementRoutes);
server.use("/api/filelink", filelinkRoutes);
server.use("/api/evaluationform", evaluationformRoutes);
server.use("/api/complaint", complaintRoutes);
server.use("/api/user", userRoutes);
server.use("/api/ta", taRoutes);
server.use("/api/questionanswer", questionAnswerRoutes);



server.use(ErrorHandler);

module.exports = server;
