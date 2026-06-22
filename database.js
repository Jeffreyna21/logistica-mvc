const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('logistica.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS Repartidor (
    id_repartidor INTEGER PRIMARY KEY,
    nombre TEXT,
    email TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS Zonas (
    id_zona INTEGER PRIMARY KEY,
    nombre_zona TEXT,
    tarifa_por_kg REAL
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS Envios (
    id_envio INTEGER PRIMARY KEY,
    id_repartidor INTEGER,
    id_zona INTEGER,
    peso_kg REAL,
    fecha_envio TEXT
  )`);

  db.get('SELECT COUNT(*) as c FROM Repartidor', (err, row) => {
    if (row && row.c === 0) {
      db.run(`INSERT INTO Repartidor VALUES (1,'Andrés Torres','andres@correo.com')`);
      db.run(`INSERT INTO Repartidor VALUES (2,'Camila Ruiz','camila@correo.com')`);
      db.run(`INSERT INTO Repartidor VALUES (3,'Luis Méndez','luis@correo.com')`);
      db.run(`INSERT INTO Zonas VALUES (1,'Norte',1.50)`);
      db.run(`INSERT INTO Zonas VALUES (2,'Sur',2.00)`);
      db.run(`INSERT INTO Zonas VALUES (3,'Centro',1.75)`);
      db.run(`INSERT INTO Envios VALUES (1,1,1,8.0,'2025-05-03')`);
      db.run(`INSERT INTO Envios VALUES (2,1,1,6.5,'2025-05-10')`);
      db.run(`INSERT INTO Envios VALUES (3,1,1,7.0,'2025-05-15')`);
      db.run(`INSERT INTO Envios VALUES (4,1,1,5.5,'2025-05-20')`);
      db.run(`INSERT INTO Envios VALUES (5,1,1,5.0,'2025-05-28')`);
      db.run(`INSERT INTO Envios VALUES (6,2,2,6.0,'2025-05-05')`);
      db.run(`INSERT INTO Envios VALUES (7,2,2,7.0,'2025-05-18')`);
      db.run(`INSERT INTO Envios VALUES (8,2,2,5.0,'2025-05-25')`);
      db.run(`INSERT INTO Envios VALUES (9,3,3,4.0,'2025-04-10')`);
    }
  });
});

module.exports = db;