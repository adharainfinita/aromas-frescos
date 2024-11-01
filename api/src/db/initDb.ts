import { connectDB } from './db';

export async function initDB() {
  const db = await connectDB();
  
  try {
    await db.query('BEGIN');
    // Crear tabla customers
    await db.query(`
      CREATE TABLE IF NOT EXISTS customers (
        customer_id SERIAL PRIMARY KEY,
        customer_name TEXT NOT NULL,
        customer_email TEXT,
        customer_phone TEXT NOT NULL
      );
    `);

    // Crear tabla products
    await db.query(`
      CREATE TABLE IF NOT EXISTS products (
        product_id SERIAL PRIMARY KEY,
        product_name TEXT NOT NULL,
        product_brand TEXT NOT NULL,
        product_category TEXT NOT NULL,
        product_price REAL NOT NULL,
        product_available BOOLEAN NOT NULL,
        product_stock INTEGER DEFAULT 0
      );
    `);

    // Crear tabla purchase
    await db.query(`
      CREATE TABLE IF NOT EXISTS purchase (
        purchase_id SERIAL PRIMARY KEY,
        customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
        purchase_amount REAL NOT NULL,
        purchase_paid BOOLEAN NOT NULL,
        purchase_paid_date DATE
      );
    `);

    // Crear tabla purchaseDetails
    await db.query(`
      CREATE TABLE IF NOT EXISTS purchaseDetails (
        purchase_detail_id SERIAL PRIMARY KEY,
        purchase_id INTEGER NOT NULL REFERENCES purchase(purchase_id),
        product_id INTEGER NOT NULL REFERENCES products(product_id),
        quantity INTEGER NOT NULL,
        price_per_unit REAL NOT NULL
      );
    `);

    console.log('Base de datos conectada y tablas creadas en PostgreSQL');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  } finally {
    db.release(); // Libera la conexión de la base de datos
  }
}
