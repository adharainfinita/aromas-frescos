import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import customerRoutes from './routes/customersRoute';
import productsRoute from './routes/productsRoute';
import purchaseRoute from './routes/purchaseRoute';
import { initDB } from './db/initDb';
import cookieParser from 'cookie-parser';

const app: Application = express();
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: ['https://aromas-frescos.vercel.app', 'https://c0cd-45-179-73-42.ngrok-free.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(cookieParser());

app.use((req, res, next) => {
  res.cookie('nombreCookie', 'valor', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  next();
});

// Ruta básica
app.get('/', (_req, res) => {
  res.send('API en Node.js con TypeScript y SQLite');
});

// Montar rutas
app.use('/api/customers', customerRoutes);
app.use('/api/products', productsRoute);
app.use('/api/purchase', purchaseRoute);

export default app;

if (process.env.NODE_ENV !== 'test') {
  // Iniciar la base de datos
  initDB().then(() => {
    console.log('Base de datos inicializada correctamente');

    // Iniciar servidor
    app.listen(3000, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${3000
      }`);
    });
  }).catch(err => {
    console.log('Error al inicializar la base de datos: ', err);
  });
}
