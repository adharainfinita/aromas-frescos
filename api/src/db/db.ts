import { Pool } from 'pg';

const pool = new Pool({
  user: process.env.DB_USER,            // Cambia esto por tu usuario de PostgreSQL
  host: process.env.DB_HOST,              // Cambia esto si usas otro host
  database: process.env.DB_DATABASE,  // Cambia esto por el nombre de tu base de datos
  password: process.env.DB_PASSWORD,      // Cambia esto por tu contraseña de PostgreSQL
  port: Number(process.env.DB_PORT),                     // Puerto predeterminado de PostgreSQL
});

// Función para obtener una conexión a la base de datos
export async function connectDB() {
  const client = await pool.connect();
  return client;
}