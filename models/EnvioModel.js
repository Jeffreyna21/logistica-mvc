const db = require('../database');

const EnvioModel = {
  calcularPorRepartidor: function(fechaInicio, fechaFin) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT
          r.nombre AS repartidor,
          COUNT(e.id_envio) AS total_envios,
          SUM(e.peso_kg) AS total_kg,
          z.nombre_zona AS zona,
          z.tarifa_por_kg AS tarifa,
          SUM(e.peso_kg * z.tarifa_por_kg) AS costo_total
        FROM Repartidor r
        LEFT JOIN Envios e
          ON r.id_repartidor = e.id_repartidor
          AND e.fecha_envio BETWEEN ? AND ?
        LEFT JOIN Zonas z
          ON e.id_zona = z.id_zona
        GROUP BY r.id_repartidor, z.id_zona
        ORDER BY r.nombre
      `;
      db.all(query, [fechaInicio, fechaFin], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = EnvioModel;