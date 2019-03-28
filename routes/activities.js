const express = require("express");
const checkAuth = require("../middleware/check-auth");

const ActivitiesController = require("../controllers/activities");

const router = express.Router();

router.get("", ActivitiesController.getActivities);

router.get("/events", ActivitiesController.getAllEvents);

router.post("/create", checkAuth, ActivitiesController.createActivity);

router.put("/edit", checkAuth, ActivitiesController.updateActivity);

router.delete("/:id", checkAuth, ActivitiesController.deleteActivity);

router.post("/create/event", checkAuth, ActivitiesController.createEvent);

router.put("/edit/event", checkAuth, ActivitiesController.updateEvent);

router.delete("/event/:id", checkAuth, ActivitiesController.deleteEvent);

module.exports = router;