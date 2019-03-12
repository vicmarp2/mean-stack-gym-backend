const express = require("express");

const GymsController = require("../controllers/gyms");

const router = express.Router();

router.get("", GymsController.getGyms);

router.get("/:codName", GymsController.getGym);

router.post("/create", GymsController.createGym);

router.delete("/:id", GymsController.deleteGym);

router.put("/edit", GymsController.updateGym);

module.exports = router;