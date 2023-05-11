var express = require('express');
var router = express.Router();
var fs = require("fs");
const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database('database.db', err => {
  if (err) {
    return console.error(err.message);
  }
  console.log("Database Connected");
})


/* GET home page. */
router.get('/', function (req, res, next) {
  // Filters or Searching
  const params = []

  const filterData = {}
  // Filter ID
  if (req.query.check_ID && req.query.id) {
    params.push(`id = '${req.query.id}'`)
  }
  // Filter string
  if (req.query.check_Str && req.query.string) {
    params.push(`dataStr LIKE '%${req.query.string}%'`)
  }
  // Filter integer
  if (req.query.check_Int && req.query.integer) {
    params.push(`dataInt = '${req.query.integer}'`)
  }
  // Filter float
  if (req.query.check_Float && req.query.float) {
    params.push(`dataFloat = '${req.query.float}'`)
  }
  // Filter date
  if (req.query.check_Date && req.query.StartDate && req.query.EndDate) {
    params.push(`tanggal BETWEEN '${req.query.StartDate}' AND '${req.query.EndDate}'`)
  }

  // Filter boolean
  if (req.query.check_Bol && req.query.boolean) {
    params.push(`dataBol = '${req.query.boolean}'`)
  }  

  // Pagination
  let sqlCount = `SELECT count(*) as total FROM data`
  if (params.length > 0) {
    sqlCount += ` WHERE ${params.join(' AND  ')}`
  }
  db.all(sqlCount, [], (err, row) => {
    const rows = row[0].total
    const page = req.query.page || 1;
    const limit = 3;
    const offset = (page - 1) * limit;
    const pages = Math.ceil(rows / limit);
    // console.log(req.url)
    const url = req.url == '/' ? '/?page=1' : req.url // membuat limit pagination
    let sql = `SELECT * FROM data`;
    if (params.length > 0) {
      sql += ` WHERE ${params.join(' AND  ')}`
    }
    sql += ` LIMIT ${limit} OFFSET ${offset}`
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error(err);
      } else {
        res.render('index', { title: 'SQLITE-Bread', rows, pages, page, url, query : req.query});
      }
    })
  })
});
router.get('/add', function (req, res, next) {
  res.render('add', { title: "Add data" })
})

router.post('/add', (req, res, next) => {
  const sql = "INSERT INTO data(dataStr,dataInt,dataFloat,tanggal,dataBol) VALUES(?,?,?,?,?)"
  db.run(sql, [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean], (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      res.redirect('/');
    }
  })
});

router.get('/edit/:id', (req, res, next) => {
  const sql = "SELECT * FROM data WHERE id = ?";
  db.get(sql, [req.params.id,], (err, rows) => {
    if (err) {
      console.error(err.message);
    } else {
      res.render('edit', { title: "Edit Data", rows })
    }
  })
});

router.post('/edit/:id', (req, res, next) => {
  let sql = `UPDATE data SET dataStr = ?, dataInt = ?, dataFloat = ?, tanggal=?, dataBol = ? WHERE id = ?`;
  db.run(sql, [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean, req.params.id], (err) => {
    if (err) {
      console.error(err.message);
    }
    res.redirect('/');
  });
})

router.get('/delete/:id', (req, res, next) => {
  const sql = "DELETE FROM data WHERE id = ?";
  db.run(sql, [req.params.id], (err) => {
    if (err) {
      console.error(err.message);
    }
    else {
      res.redirect('/');
    }
  })
});

// Helpers
function indonesianMonthString(date) {
  let tahun = date.split('-')[0]
  let bulan = date.split('-')[1]
  let tanggal = date.split('-')[2]
  switch (bulan) {
    case '01': bulan = "Januari"; break;
    case '02': bulan = "Februari"; break;
    case '03': bulan = "Maret"; break;
    case '04': bulan = "April"; break;
    case '05': bulan = "Mei"; break;
    case '06': bulan = "Juni"; break;
    case '07': bulan = "Juli"; break;
    case '08': bulan = "Agustus"; break;
    case '09': bulan = "September"; break;
    case '10': bulan = "Oktober"; break;
    case '11': bulan = "November"; break;
    case '12': bulan = "Desember"; break;
  }
  return `${tanggal} ${bulan} ${tahun}`
}
function indonesianMonthInt(string) {
  let tahun = string.split(' ')[2]
  let bulan = string.split(' ')[1]
  let tanggal = string.split(' ')[0]
  switch (bulan) {
    case 'Januari': bulan = "01"; break;
    case 'Februari': bulan = "02"; break;
    case 'Maret': bulan = "03"; break;
    case 'April': bulan = "04"; break;
    case 'Mei': bulan = "05"; break;
    case 'Juni': bulan = "06"; break;
    case 'Juli': bulan = "07"; break;
    case 'Agustus': bulan = "08"; break;
    case 'September': bulan = "09"; break;
    case 'Oktober': bulan = "10"; break;
    case 'November': bulan = "11"; break;
    case 'Desember': bulan = "12"; break;
  }
  return `${tahun}-${bulan}-${tanggal}`
}
module.exports = router;
