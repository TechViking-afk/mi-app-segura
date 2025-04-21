// app/src/index.js
const express = require('express');
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(__dirname + '/static'));

// Healthcheck para tests
app.get('/', (_req, res) => {
  res.sendStatus(200);
});

// Rutas de la API
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

// Función para cerrar la DB y el servidor
const gracefulShutdown = (server) => {
  return () => {
    db.teardown()
      .catch(() => {})
      .then(() => {
        if (server) server.close(() => process.exit(0));
        else process.exit(0);
      });
  };
};

// Si este fichero se ejecuta directamente con `node src/index.js`
if (require.main === module) {
  db.init()
    .then(() => {
      const server = app.listen(3000, () =>
        console.log('Listening on port 3000')
      );

      // Captura de señales para shutdown limpio
      process.on('SIGINT', gracefulShutdown(server));
      process.on('SIGTERM', gracefulShutdown(server));
      process.on('SIGUSR2', gracefulShutdown(server));
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

// Exportar la app para que los tests la importen sin arrancar el servidor
module.exports = app;
