const EnvioModel = require('../models/EnvioModel');

const envioController = {
  mostrarFormulario: (req, res) => {
    res.render('index', { resultados: null, fechaInicio: '', fechaFin: '' });
  },

  calcularCostos: async (req, res) => {
    const { fechaInicio, fechaFin } = req.body;
    const resultados = await EnvioModel.calcularPorRepartidor(fechaInicio, fechaFin);
    res.render('index', { resultados, fechaInicio, fechaFin });
  }
};

module.exports = envioController;