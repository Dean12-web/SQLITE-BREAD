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


/* GET home page. */
router.get('/', function(req, res, next) {
  const sql = "SELECT * FROM data";
  db.all(sql, [], (err, rows) =>{
    if(err){
      console.error(err);
    }else{
      res.render('index', { title: 'JSON-Bread', rows });
    }
  })
});
router.get('/add', function(req, res, next){
  res.render('add', {title: "Add data"})
})

router.post('/add', (req,res, next)=>{
  const sql = "INSERT INTO data(dataStr,dataInt,dataFloat,tanggal,dataBol) VALUES(?,?,?,?,?)"
  db.run(sql, [req.body.string,req.body.integer,req.body.float,req.body.date,req.body.boolean],function (err){
    if(err){
      console.error(err.message);
    }
    else{
      res.redirect('/');
    }
  })
})
router.get('/edit', function(req,res, next){
  res.render('edit', {title:"Edit Data"})
})
module.exports = router;
