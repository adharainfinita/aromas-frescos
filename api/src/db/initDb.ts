import { connectDB } from './db';

// Función para inicializar la base de datos (crear tablas)
export async function initDB() {
  const db = await connectDB();
  db.on('trace', (sql:any) => {
    console.log('Ejecutando consulta SQL:', sql);
  });

  // Crear tabla customers si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT,
      customer_phone TEXT NOT NULL
    );
  `);

  // Crear tabla products si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      product_id INTEGER PRIMARY KEY AUTOINCREMENT,
      product_name TEXT NOT NULL,
      product_brand TEXT NOT NULL,
      product_category TEXT NOT NULL,
      product_price REAL NOT NULL,
      product_available BOOLEAN NOT NULL,
      product_stock INTEGER DEFAULT 0
    );
  `);

  // Crear tabla purchase si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS purchase (
      purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_id INTEGER NOT NULL,
      purchase_amount REAL NOT NULL,
      purchase_paid BOOLEAN NOT NULL,
      purchase_paid_date DATE,
      FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
    );
  `);

  // Crear tabla purchaseDetails si no existe
  await db.exec(`
    CREATE TABLE IF NOT EXISTS purchaseDetails (
      purchase_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
      purchase_id INTEGER NOT NULL,
      product_id INTEGER NOT NULL,
      quantity INTEGER NOT NULL,
      price_per_unit REAL NOT NULL,
      FOREIGN KEY (purchase_id) REFERENCES purchase(purchase_id),
      FOREIGN KEY (product_id) REFERENCES products(product_id)
    );
  `);

  console.log('Base de datos conectada y tablas creadas');
}
