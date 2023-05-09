var express = require('express');
var router = express.Router();
var fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('database.db', err =>{
  if (err){
    return console.error(err.message);
  }
  console.log("Database Connected");
})

const sql = "SELECT * FROM data";

/* GET home page. */
router.get('/', function(req, res, next) {
  db.all(sql, [], (err, rows) =>{
    if(err){
      console.error(err);
    }else{
      res.render('index', { title: 'JSON-Bread', rows });
    }
  })
});

module.exports = router;
