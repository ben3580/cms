var express = require('express');
var router = express.Router();
const Course = require('../models/Course')

const sessionChecker = (req, res, next)=>{
  if(req.session.user){
    next()
  }else{
    res.redirect("/?msg=raf")
  }
}

router.use(sessionChecker)

/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(req.session.user)
  if(req.query.msg){
    res.locals.msg = req.query.msg
    res.locals.courseid = req.query.courseid
  }
  res.render('courses')
});

router.post('/create', async function(req, res, next) {
  try {
    await Course.create(
      {
        courseid: req.body.courseid,
        coursename: req.body.coursename,
        semester: req.body.semester,
        coursedesc: req.body.coursedesc,
        enrollnum: req.body.enrollnum
      }
  )
  res.redirect('/courses?msg=success&courseid'+req.body.courseid)
  } catch (error) {
  res.redirect('/courses?msg='+new URLSearchParams(error.toString()).toString()+'&courseid'+req.body.courseid) 
  }
});

module.exports = router;
