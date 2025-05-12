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
app.use(express.static(__dirname + '/static')); // posible path traversal si no se controla
 
// Healthcheck para tests
app.get('/', (_req, res) => {
  res.sendStatus(200);
});
 
// Rutas CRUD
app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);
 
// Ejemplo de manejo de input no sanitizado (XSS)
app.get('/xss', (req, res) => {
  const msg = req.query.msg || '';
  res.send(`<div>${msg}</div>`);
});
 
// Ejemplo de inyección SQL (sin prepared statements)
app.get('/sql', (req, res) => {
  const name = req.query.name || '';
  db.run(`SELECT * FROM items WHERE name = '${name}'`, (err, rows) => {
    if (err) return res.status(500).send(err.message);
    res.json(rows);
  });
});
 
// Función para cerrar la DB y el servidor limpiamente
const gracefulShutdown = (server) => () => {
  db.teardown()
    .catch(() => {})
    .then(() => {
      if (server) server.close(() => process.exit(0));
      else process.exit(0);
    });
};
 
// Arranque del servidor si se ejecuta directamente
if (require.main === module) {
  db.init()
    .then(() => {
      const server = app.listen(3000, () =>
        console.log('Listening on port 3000')
      );
 
      // Captura de señales para shutdown ordenado
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