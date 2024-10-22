import express, { Application } from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import customerRoutes from './routes/customers';

// Abrir conexión a la base de datos
async function connectDB() {
  const db = await open({
    filename: './my-database.db',
    driver: sqlite3.Database
  });
  return db;
}

// Ejemplo de cómo utilizar la conexión
async function init() {
  const db = await connectDB();

  // Crear tabla si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT,
      phone TEXT NOT NULL
    )
  `);
  console.log('Base de datos conectada y tablas creadas');
}

init();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta básica
app.get('/', (req, res) => {
  res.send('API en Node.js con TypeScript y SQLite');
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Rutas
app.use('/api', customerRoutes);
