const express = require('express');
const router = express.Router();
const coursesapiRouter = require('../api/coursesapi')

router.use('/courses', coursesapiRouter);

router.get('/',(req, res, next)=>{
    res.send('api route')
})

module.exports = router