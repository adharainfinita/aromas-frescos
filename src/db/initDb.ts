import { connectDB } from './db';

// Función para inicializar la base de datos (crear tablas)
export async function initDB() {
  const db = await connectDB();

  // Crear tabla customers si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT NOT NULL
    );
  `);

  // Aquí podrías agregar otras tablas si necesitas
  // Crear tabla products si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      product_brand TEXT NOT NULL,
      product_category TEXT NOT NULL,
      product_price REAL NOT NULL,
      product_status BOOLEAN NOT NULL
    );
  `);

  console.log('Base de datos conectada y tablas creadas');
}
