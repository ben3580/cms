var express = require("express");
var router = express.Router();
const Course = require("../models/Course");
const { body, validationResult } = require("express-validator");
const {
  courseidValidator,
  enrollnumValidator,
} = require("../util/validations");

const sessionChecker = (req, res, next) => {
  if (req.session.user) {
    res.locals.username = req.session.user.username;
    next();
  } else {
    res.redirect("/?msg=raf");
  }
};

router.use(sessionChecker);

/* GET users listing. */
router.get("/", async function (req, res, next) {
  //console.log(req.session.user)
  const courses = await Course.findAll();
  if (req.query.msg) {
    res.locals.msg = req.query.msg;
    res.locals.courseid = req.query.courseid;
  }
  res.render("courses", { courses });
});

router.post(
  "/create",
  body("courseid").custom(courseidValidator),
  body("enrollnum").custom(enrollnumValidator),
  async function (req, res, next) {
    try {
      const result = validationResult(req);
      const result2 = result.formatWith((error) => error.msg);
      const errors2 = result2.array();

      console.log(errors2);
      if (!result.isEmpty()) {
        throw new Error(errors2[0]);
      } else {
        await Course.create({
          courseid: req.body.courseid,
          coursename: req.body.coursename,
          semester: req.body.semester,
          coursedesc: req.body.coursedesc,
          enrollnum: req.body.enrollnum,
        });
        res.redirect("/courses?msg=success&courseid=" + req.body.courseid);
      }
    } catch (error) {
      res.redirect(
        "/courses?msg=" +
          new URLSearchParams(error.toString()).toString() +
          "&courseid" +
          req.body.courseid
      );
    }
  }
);

router.get("/:courseid", async function (req, res, next) {
  const course = await Course.findCourse(req.params.courseid);
  if (course) {
    res.render("coursedetails", { course });
  } else {
    res.redirect(
      "/courses/?msg=course+not+found&?courseid=" + req.params.courseid
    );
  }
});

router.get("/delete/:courseid", async function (req, res, next) {
  const course = await Course.findCourse(req.params.courseid);
  if (course) {
    await course.destroy();
    res.redirect("/courses/?msg=successdel&courseid=" + req.params.courseid);
  } else {
    res.redirect(
      "/courses/?msg=course+not+found&courseid=" + req.params.courseid
    );
  }
});

module.exports = router;
