const express = require("express");
const checkAuth = require("../middleware/check-auth");

const GymsController = require("../controllers/gyms");

const router = express.Router();

router.get("", GymsController.getGyms);

router.get("/:codName", GymsController.getGym);

router.post("/create", checkAuth, GymsController.createGym);

router.delete("/:id", checkAuth, GymsController.deleteGym);

router.put("/edit", checkAuth, GymsController.updateGym);

module.exports = router;