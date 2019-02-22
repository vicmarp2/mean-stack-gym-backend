const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/users");
const gymRoutes = require("./routes/gyms");
const activityRoutes = require("./routes/gyms");
const courseRoutes = require("./routes/gyms");
const quotaRoutes = require("./routes/gyms");

const app = express();

mongoose
  .connect(
    "mongodb+srv://max:" +
      process.env.MONGO_ATLAS_PW +
      "@cluster0-ntrwp.mongodb.net/node-angular"
  )
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

app.use("/api/user", userRoutes);
app.use("/api/gyms", gymRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/quotas", quotaRoutes);

module.exports = app;
