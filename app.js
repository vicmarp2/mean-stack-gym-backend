const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gyms");
const activityRoutes = require("./routes/activities");
const courseRoutes = require("./routes/courses");
const quotaRoutes = require("./routes/quotas");
const restUserRoutes = require("./rest/routes/users");
const restActivityRoutes = require("./rest/routes/activities");
const restAuthRoutes = require("./rest/routes/auth");

const app = express();

const DATABASE = 'mean-stack-gym';
const DB_URL = `mongodb://localhost:27017/${DATABASE}`;

mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true})
  .then(() => {
      console.log("Connected to database!");
    })
    .catch(() => {
      console.log("Connection failed!");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/gyms", gymRoutes);
app.use("/api/v1/activities", activityRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/quotas", quotaRoutes);


app.use("/api/v1/rest/users", restUserRoutes);
app.use("/api/v1/rest/activities", restActivityRoutes);
app.use("/api/v1/rest/auth", restAuthRoutes);

module.exports = app;
