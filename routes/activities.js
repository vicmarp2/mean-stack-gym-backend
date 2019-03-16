const express = require("express");

const ActivitiesController = require("../controllers/activities");

const router = express.Router();

router.get("", ActivitiesController.getActivities);

router.get("/events", ActivitiesController.getAllEvents);

router.post("/create", ActivitiesController.createActivity);

router.put("/edit", ActivitiesController.updateActivity);

router.delete("/:id", ActivitiesController.deleteActivity);

module.exports = router;