import express, { Application } from 'express';
import customerRoutes from './routes/customersRoute';
import { initDB } from './db/initDb';

const app: Application = express();
// Middleware para parsear JSON
app.use(express.json());


// Iniciar la base de datos
initDB().then(() => {
  console.log('Base de datos inicializada correctamente');
});

// Ruta básica
app.get('/', (_req, res) => {
  res.send('API en Node.js con TypeScript y SQLite');
});

// Iniciar servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

// Rutas
app.use('/api', customerRoutes);
