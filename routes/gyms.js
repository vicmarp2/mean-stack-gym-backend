const express = require("express");

const GymsController = require("../controllers/gyms");

const router = express.Router();

router.get("", GymsController.getGyms);

router.get("/:codName", GymsController.getGym);


module.exports = router;