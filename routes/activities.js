const express = require("express");

const ActivitiesController = require("../controllers/activities");

const router = express.Router();

router.get("", ActivitiesController.getActivities);

router.get("/events", ActivitiesController.getAllEvents);

module.exports = router;