const Database = require('better-sqlite3');
const db = new Database('logistica.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS Repartidor (
    id_repartidor INTEGER PRIMARY KEY,
    nombre TEXT,
    email TEXT
  );

  CREATE TABLE IF NOT EXISTS Zonas (
    id_zona INTEGER PRIMARY KEY,
    nombre_zona TEXT,
    tarifa_por_kg REAL
  );

  CREATE TABLE IF NOT EXISTS Envios (
    id_envio INTEGER PRIMARY KEY,
    id_repartidor INTEGER,
    id_zona INTEGER,
    peso_kg REAL,
    fecha_envio TEXT,
    FOREIGN KEY (id_repartidor) REFERENCES Repartidor(id_repartidor),
    FOREIGN KEY (id_zona) REFERENCES Zonas(id_zona)
  );
`);

// Seed data (solo inserta si está vacío)
const count = db.prepare('SELECT COUNT(*) as c FROM Repartidor').get();
if (count.c === 0) {
  db.exec(`
    INSERT INTO Repartidor VALUES (1, 'Andrés Torres', 'andres@correo.com');
    INSERT INTO Repartidor VALUES (2, 'Camila Ruiz', 'camila@correo.com');
    INSERT INTO Repartidor VALUES (3, 'Luis Méndez', 'luis@correo.com');

    INSERT INTO Zonas VALUES (1, 'Norte', 1.50);
    INSERT INTO Zonas VALUES (2, 'Sur', 2.00);
    INSERT INTO Zonas VALUES (3, 'Centro', 1.75);

    INSERT INTO Envios VALUES (1, 1, 1, 8.0,  '2025-05-03');
    INSERT INTO Envios VALUES (2, 1, 1, 6.5,  '2025-05-10');
    INSERT INTO Envios VALUES (3, 1, 1, 7.0,  '2025-05-15');
    INSERT INTO Envios VALUES (4, 1, 1, 5.5,  '2025-05-20');
    INSERT INTO Envios VALUES (5, 1, 1, 5.0,  '2025-05-28');
    INSERT INTO Envios VALUES (6, 2, 2, 6.0,  '2025-05-05');
    INSERT INTO Envios VALUES (7, 2, 2, 7.0,  '2025-05-18');
    INSERT INTO Envios VALUES (8, 2, 2, 5.0,  '2025-05-25');
    INSERT INTO Envios VALUES (9, 3, 3, 4.0,  '2025-04-10');
  `);
}

module.exports = db;