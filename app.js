const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const envioController = require('./controllers/envioController');
app.get('/', envioController.mostrarFormulario);
app.post('/calcular', envioController.calcularCostos);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});