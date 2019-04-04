const express = require("express");

const UserController = require("../controllers/users");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("", checkAuth, UserController.getUsers);

router.get("/:userId", checkAuth, UserController.getUser);

router.get("/access/:userId", checkAuth, UserController.getUserAccess);

router.get("/access/event/:userId", checkAuth, UserController.getUserAccessToEvent);

module.exports = router;
