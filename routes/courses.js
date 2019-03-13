const express = require("express");

const CoursesController = require("../controllers/courses");

const router = express.Router();

router.get("", CoursesController.getCourses);

router.post("/create", CoursesController.createCourse);

router.put("/edit", CoursesController.updateCourse);

router.delete("/:id", CoursesController.deleteCourse);

module.exports = router;