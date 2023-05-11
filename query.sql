CREATE TABLE data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dataStr CHARACTER(255),
    dataInt INTEGER,
    dataFloat FLOAT,
    tanggal DATE,
    dataBol BOOLEAN
);

INSERT INTO data(id,dataStr,dataInt,dataFloat,tanggal,dataBol) 
VALUES(1,"Testing Data",12,1.45,"2023-05-02","true"),
(2,"Testing Data",13,1.12,"2023-05-03","true"),
(3,"Testing",14,1.12,"2023-05-04","false"),
(4,"Test Data",15,1.12,"2023-05-05","false"),
(5,"Test",16,1.12,"2023-05-06","false"),
(6,"Data",17,1.12,"2023-05-07","true"),
(7,"Tes Data",18,1.12,"2023-05-08","true"),
(8,"Data",19,1.12,"2023-05-03","false"),
(9,"Testing Data",13,1.12,"2023-05-09","true");