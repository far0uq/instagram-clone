require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const followRoutes = require("./routes/follow");

mongoose.connect(process.env.DB_URI);

// Setting up middleware
app.use(express.json({ limit: "10mb" }));
app.use(cors());

//Defining Routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/follow", followRoutes);

app.listen(5000, () => console.log("Listening on port 5000"));
