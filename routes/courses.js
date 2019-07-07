const express = require("express");
const checkAuth = require("../middleware/check-auth");

const CoursesController = require("../controllers/courses");

const router = express.Router();

router.get("", CoursesController.getCourses);

router.post("/create", checkAuth, CoursesController.createCourse);

router.put("/edit", checkAuth, CoursesController.updateCourse);

router.delete("/:id", checkAuth, CoursesController.deleteCourse);

module.exports = router;