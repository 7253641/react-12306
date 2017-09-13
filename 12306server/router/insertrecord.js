var express = require('express')
var router = express.Router()
var cors = require('cors')
var waterfall = require('async/waterfall')
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer() // for parsing multipart/form-data

router.use(cors())
router.use(bodyParser.json()); // for parsing application/json
router.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var mysql      = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jin',
  password : '123456',
  database : 'react'
})

router.post('/', upload.array(), function (req, res, next) {
  waterfall([
    function(callback) {
        var  sql = 'INSERT INTO user'+req.body.id+'(id, number, title, time, type) VALUES(NULL,\''+req.body.number+'\',\''+req.body.title+'\',\''+req.body.time+'\',\''+req.body.type+'\')'
        //INSERT
        connection.query(sql,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message)
                  callback(null, 0)
                  return
                }
                callback(null, 1)
            })
        },
      function(arg1, callback) {
          res.json({"message": arg1})
          callback(null)
        }
      ], function (err, result) {
  })
})
module.exports = router
