const express = require("express");

const UserController = require("../controllers/users");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/signup/free", UserController.createFreeUser);

router.post("/login", UserController.userLogin);

router.post("/duplicate", UserController.checkDuplicatedUser);

router.post("/duplicate/dni", UserController.checkDuplicatedDNI);

module.exports = router;
