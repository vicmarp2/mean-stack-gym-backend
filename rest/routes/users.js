const express = require("express");

const UserController = require("../controllers/users");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();


router.get("", checkAuth, UserController.getUsers);

router.get("/:userId", checkAuth, UserController.getUser);

router.get("/access/event", checkAuth, UserController.getUserAccessToEvent);


router.get("/access/:userId", checkAuth, UserController.getUserAccess);

module.exports = router;
