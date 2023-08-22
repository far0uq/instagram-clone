require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");

mongoose.connect(process.env.DB_URI);

// Setting up middleware
app.use(express.json());
app.use(cors());

//Defining Routes
app.use("/api/user", userRoutes);

app.listen(5000, () => console.log("Listening on port 5000"));
