import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
//  user: process.env.PGUSER,            // Cambia esto por tu usuario de PostgreSQL
  //host: process.env.PGHOST,              // Cambia esto si usas otro host
  //database: process.env.PGDATABASE,  // Cambia esto por el nombre de tu base de datos
  //password: process.env.PGPASSWORD,      // Cambia esto por tu contraseña de PostgreSQL
  //port: Number(process.env.PGPORT),                     // Puerto predeterminado de PostgreSQL
});

// Función para obtener una conexión a la base de datos
export async function connectDB() {
  const client = await pool.connect();
  return client;
}