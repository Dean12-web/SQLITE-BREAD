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

    const sqlCount = `SELECT count(*) as total FROM data`
    const rows = row[0].total
    console.log(rows)
    const page = req.query.page || 1;
    const limit = 3 ;
    const offset = (page - 1) * limit;
    const pages = Math.ceil(rows / limit)
    const sql = `SELECT * FROM data LIMIT ${limit} OFFSET ${offset}`;
    db.all(sql, [], (err, rows) =>{
      if(err){
        console.error(err);
      }else{
        res.render('index', { title: 'SQLITE-Bread', rows, pages });
      }
    })
  
});
router.get('/add', function(req, res, next){
  res.render('add', {title: "Add data"})
})

router.post('/add', (req,res, next)=>{
  const sql = "INSERT INTO data(dataStr,dataInt,dataFloat,tanggal,dataBol) VALUES(?,?,?,?,?)"
  db.run(sql, [req.body.string,req.body.integer,req.body.float,req.body.date,req.body.boolean],(err)=>{
    if(err){
      console.error(err.message);
    }
    else{
      res.redirect('/');
    }
  })
});

router.get('/edit/:id', (req,res, next)=>{
  const sql = "SELECT * FROM data WHERE id = ?";
  db.get(sql, [req.params.id], (err, rows) =>{
    if(err){
      console.error(err.message);
    }else{
      res.render('edit', {title:"Edit Data", rows})
    }
  })
});

router.post('/edit/:id', (req,res, next)=>{
  let sql = `UPDATE data SET dataStr = ?, dataInt = ?, dataFloat = ?, tanggal=?, dataBol = ? WHERE id = ?`;
  db.run(sql,[req.body.string,req.body.integer,req.body.float,req.body.date,req.body.boolean,req.params.id],(err) => {
    if (err) {
        console.error(err.message);
    }
    res.redirect('/');
});
})

router.get('/delete/:id', (req,res,next)=>{
  const sql = "DELETE FROM data WHERE id = ?";
  db.run(sql, [req.params.id], (err) =>{
    if(err){
      console.error(err.message);
    }
    else{
      res.redirect('/');
    }
  })
});
module.exports = router;
