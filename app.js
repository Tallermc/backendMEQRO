const express = require('express');
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./routes/index');
const apiLogin = require('./routes/APIs/auth')

//Middleware del body para hacerlo JSON
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//Resolucion de CORS
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}))

//API routes
app.use('/', routes);
app.use('/auth/', apiLogin)

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto:${port}`);
});
