const express = require("express");
const app = express();

const connectDb = require("./config/databaseConnect");
const dotenv = require("dotenv").config();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
app.use(express.json());
app.use(cookieParser());
const port = process.env.PORT || 5001;

connectDb();
const corsOptions = {
  origin: "https://new-1-frontendtaskmanagement.onrender.com", // Replace with your frontend URL
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add any additional headers required by your server
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));

const user = require("./routes/userRoutes");
app.use("/user", user);
const task = require("./routes/taskRoutes");
app.use("/tasks", task);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

module.exports = app;
