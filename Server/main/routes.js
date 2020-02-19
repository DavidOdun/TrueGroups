var express = require('express')
var router = express.Router()
var pool = require('./db')


/* 
    API POST ROUTES BELOW
*/
router.get('/hello', function (req, res) {
    res.json('hello world')
})

module.exports = router