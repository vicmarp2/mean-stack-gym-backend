const express = require("express");

const CoursesController = require("../controllers/courses");

const router = express.Router();

router.get("", CoursesController.getCourses);

module.exports = router;