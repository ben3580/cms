var express = require('express');
var router = express.Router();
const Course = require('../models/Course')

router.get('/', async (req, res, next) => {
    try {
        const courses = await Course.findAll();
        res.json(courses)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:courseid', async (req, res, next) => {
    const course = await Course.findCourse(req.params.courseid)
    if(course){
      res.json(course)
    }else{
      res.status(404).json(`{msg: course ${req.params.courseid} not found}`)
    }
})

router.post('/', async function(req, res, next) {
    try {
      const course = await Course.create(
        {
          courseid: req.body.courseid,
          coursename: req.body.coursename,
          semester: req.body.semester,
          coursedesc: req.body.coursedesc,
          enrollnum: req.body.enrollnum
        }
    )
    res.json(course)
    } catch (error) {
        res.status(500).json(error)
    }
  })

  router.delete("/:courseid", async function(req, res, next) {
    const course = await Course.findCourse(req.params.courseid)
    if(course){
      await course.destroy()
      res.json({msg: 'deleted succesfully'})
    }else{
        res.status(404).json({msg: `course ${req.params.courseid} not found`})
    }
  })

module.exports = router