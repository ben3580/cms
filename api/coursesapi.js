const express = require('express');
const router = express.Router();
const Course = require('../models/Course')

router.get('/',async (req, res, next)=>{
    const courses = await Course.findAll();
    if(req.query.msg){
      res.locals.msg = req.query.msg
      res.locals.courseid = req.query.courseid
    }
    res.json(courses)
})

router.post('/', async (req, res, next)=>{
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

router.delete("/:courseid", async (req,res,next)=>{
    const course = await Course.findCourse(req.params.courseid)
    if(course){
        try {
            await course.destroy()
            res.status(200).json({message: `course ${course.courseid} deleted successfully`})
        } catch (error) {
            res.status(500).json(error)
        }
    }else{
      res.status(404).json({message: `course ${req.params.courseid} is not found`})
    }
})

router.patch("/:courseid",async (req,res,next)=>{
    const course = await Course.findCourse(req.params.courseid)
    if(course){
        try {
            course.coursename = req.body.coursename || course.coursename
            course.coursedesc = req.body.coursedesc || course.coursedesc
            course.enrollnum = req.body.enrollnum || course.enrollnum
            course.semester = req.body.semester || course.semester
            const updatedcourse = await course.save()
            res.json(updatedcourse)
        }catch(err){
            console.error(err);
            res.status(500).json(err)
        }
    }else{
        res.status(404).json({message: `course ${req.params.courseid} is not found`})
      }
    })

module.exports = router