require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();

const signUpRoutes = require("./routes/signup");
const loginRoutes = require("./routes/login");
const forgotPasswordRoutes = require("./routes/forgot-password");
const tokenValidationRoutes = require("./routes/token-validation");
const resetPasswordRoutes = require("./routes/reset-password");

mongoose.connect(process.env.DB_URI);

// Setting up middleware
app.use(express.json());
app.use(cors());

//Defining Routes
app.use("/api/signup", signUpRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/forgot-password", forgotPasswordRoutes);
app.use("/api/token-validation", tokenValidationRoutes);
app.use("/api/reset-password", resetPasswordRoutes);

app.listen(5000, () => console.log("Listening on port 5000"));
