const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');

const sql = "SELECT * FROM data";
db.all(sql, (err, rows) => {
    if (err) {
        console.error(err);
    } else {
        console.log(rows)
    }
});
db.close()

    