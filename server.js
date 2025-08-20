const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDB = require("./config/connectionDB");
const cors = require("cors");
app.use(cors());
const multer = require("multer");
const path = require("path");

const PORT = process.env.PORT || 3000;
connectDB();
app.use(express.json());
app.use("/recipe", require("./routes/recipe"));
// app.use("/api/recipes", require("./routes/recipe"));

app.use("/", require("./routes/user"));
// app.use("/api/users", require("./routes/user"));

app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.listen(PORT, (err) => {
  console.log(`app is listening on port ${PORT}`);
});
