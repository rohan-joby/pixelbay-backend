require("dotenv").config();
const express = require("express");
const authRoute = require("./routes/authRoutes");
const likedRoute = require("./routes/likedRoutes");
const collectionsRoute = require("./routes/collectionsRoutes");

const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const app = express();
connectDB();

//Middleware
app.use(cors());
app.use(express.json());

//Connecting routes
app.use("/api/auth", authRoute);

//protected routes middleware
app.use("/api", likedRoute);
app.use("/api", collectionsRoute);

//errorHandle middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started at PORT ${PORT}`);
});
process.on('uncaughtException', function (err) {
  console.log(err);
}); 
