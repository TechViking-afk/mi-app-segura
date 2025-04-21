// app/src/persistence/sqlite.js
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

// Ruta por defecto o memoria en tests
const defaultLocation = process.env.DB_LOCATION || "/etc/todos/todo.db";
const location = process.env.NODE_ENV === "test" ? ":memory:" : defaultLocation;

let db;

/**
 * Inicializa la base de datos:
 * - Si no es in-memory, crea el directorio
 * - Crea la tabla Items si no existe
 */
function init() {
    return new Promise((resolve, reject) => {
        if (location !== ":memory:") {
            const dirName = path.dirname(location);
            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }
            console.log(`Using sqlite database at ${location}`);
        }

        db = new sqlite3.Database(location, err => {
            if (err) return reject(err);
            // Crear tabla Items si aún no existe
            db.run(
                `CREATE TABLE IF NOT EXISTS Items (
                    id TEXT PRIMARY KEY,
                    name TEXT,
                    completed INTEGER
                )`,
                [],
                tableErr => tableErr ? reject(tableErr) : resolve()
            );
        });
    });
}

/**
 * Cierra la conexión a la base de datos
 */
function teardown() {
    return new Promise((resolve, reject) => {
        if (db) {
            db.close(err => err ? reject(err) : resolve());
        } else {
            resolve();
        }
    });
}

/**
 * Obtiene todas las tareas (mapea completed a boolean)
 */
function getItems() {
    return new Promise((resolve, reject) => {
        db.all("SELECT id, name, completed FROM Items", (err, rows) => {
            if (err) return reject(err);
            const mapped = rows.map(r => ({
                id: r.id,
                name: r.name,
                completed: !!r.completed
            }));
            resolve(mapped);
        });
    });
}

/**
 * Obtiene una tarea por id (mapea completed a boolean)
 */
function getItem(id) {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT id, name, completed FROM Items WHERE id = ?",
            [id],
            (err, row) => {
                if (err) return reject(err);
                if (!row) return resolve(null);
                resolve({
                    id: row.id,
                    name: row.name,
                    completed: !!row.completed
                });
            }
        );
    });
}

/**
 * Inserta una nueva tarea
 */
function storeItem(item) {
    return new Promise((resolve, reject) => {
        db.run(
            "INSERT INTO Items (id, name, completed) VALUES (?, ?, ?)",
            [item.id, item.name, item.completed ? 1 : 0],
            function(err) {
                if (err) reject(err);
                else resolve(item);
            }
        );
    });
}

/**
 * Actualiza una tarea existente:
 * acepta (id, item) para alinear con los tests
 */
function updateItem(id, item) {
    return new Promise((resolve, reject) => {
        db.run(
            "UPDATE Items SET name = ?, completed = ? WHERE id = ?",
            [item.name, item.completed ? 1 : 0, id],
            function(err) {
                if (err) return reject(err);
                resolve(item);
            }
        );
    });
}

/**
 * Elimina una tarea por id
 */
function removeItem(id) {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM Items WHERE id = ?", [id], function(err) {
            if (err) reject(err);
            else resolve();
        });
    });
}

module.exports = {
    init,
    teardown,
    getItems,
    getItem,
    storeItem,
    updateItem,
    removeItem
};