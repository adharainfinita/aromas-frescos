import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors'
import customerRoute from './routes/customersRoute.js';
import productsRoute from './routes/productsRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';
import { initDB } from './db/initDb.js';
import cookieParser from 'cookie-parser';
import { log } from 'console';


const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: ['https://aromas-frescos.vercel.app', 'http://localhost:3000/api'],
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
app.use('/api/customers', customerRoute);
app.use('/api/products', productsRoute);
app.use('/api/purchase', purchaseRoute);

export default app;

if (process.env.NODE_ENV !== 'test') {
  // Iniciar la base de datos
  initDB().then(() => {
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT
      }`);
    });
  }).catch(err => {
    console.log('Error al inicializar la base de datos: ', err);
  });
}
