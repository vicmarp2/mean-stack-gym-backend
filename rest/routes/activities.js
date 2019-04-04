const express = require("express");
const checkAuth = require("../middleware/check-auth");

const ActivitiesController = require("../controllers/activities");

const router = express.Router();

router.get("", checkAuth, ActivitiesController.getActivities);

router.get("/:id", checkAuth, ActivitiesController.getActivity);

router.get("/reservations/user/:id", checkAuth, ActivitiesController.getUserReservations);

router.get("/reservations/event/:id", checkAuth, ActivitiesController.getEventReservations);

module.exports = router;
