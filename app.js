//Traer variables de entorno
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/index');
const apiLogin = require('./routes/APIs/auth');
const dateManagment = require('./routes/APIs/dates');
const servicesManagment = require('./routes/APIs/services');
const PORT = process.env.PORT || 3000;

//Middleware del body para hacerlo JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Quitar etiquetas de entorno de desarrollo
app.disable('x-powered-by');


//Resolucion de CORS
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization'
}))

//API routes
app.use('/', routes);
app.use('/auth/', apiLogin);
app.use('/dates/', dateManagment);
app.use('/taller/', servicesManagment);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto:${PORT}`);
});
