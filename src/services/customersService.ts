import { connectDB } from '../db/db';

// Función para crear un nuevo cliente
export async function createCustomer(customer_name: string, customer_email: string, customer_phone: string) {
  const db = await connectDB();
  const result = await db.run(
    `INSERT INTO customers (customer_name, customer_email, customer_phone) VALUES (?, ?, ?)`,
    [customer_name, customer_email, customer_phone]
  );
  return result.lastID;
}

// Función para obtener todos los clientes
export async function getAllCustomers() {
  const db = await connectDB();
  const customers = await db.all('SELECT * FROM customers');
  return customers;
}

// Función para obtener un cliente por su ID
export async function getCustomerById(id: number) {
  const db = await connectDB();
  const customer = await db.get('SELECT * FROM customers WHERE customer_id = ?', [id]);
  return customer;
}

// Función para actualizar un cliente
export async function updateCustomer(id: number, customer_name: string, customer_email: string, customer_phone: string) {
  const db = await connectDB();
  const result = await db.run(
    `UPDATE customers SET customer_name = ?, customer_email = ?, customer_phone = ? WHERE customer_id = ?`,
    [customer_name, customer_email, customer_phone, id]
  );
  return result.changes;
}
