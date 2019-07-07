const express = require("express");
const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/users");

const router = express.Router();

router.post("/signup", UserController.createUser);

router.post("/signup/free", UserController.createFreeUser);

router.post("/login", UserController.userLogin);

router.post("/duplicate", UserController.checkDuplicatedUser);

router.post("/duplicate/dni", UserController.checkDuplicatedDNI);

router.get("", UserController.getUsers);

router.get("/user/:userId", UserController.getUser);

router.delete("/user/:userId", checkAuth, UserController.deleteUser);

router.get("/users", UserController.listUsers);

router.put("/edit", checkAuth, UserController.updateUser);


module.exports = router;
