CREATE TABLE data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataStr CHARACTER(255),
    dataInt INTEGER,
    dataFloat FLOAT,
    tanggal date,
    dataBol BOOLEAN
);

INSERT INTO data(id,dataStr,dataInt,dataFloat,tanggal,dataBol) 
VALUES(1,"Testing Data",12,1.45,"07-07-2017",'True');