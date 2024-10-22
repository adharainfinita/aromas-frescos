import { connectDB } from '../db/db';

interface ICustomer {
  name: string;
  email?: string;
  phone: string;
}

// Función para crear un nuevo cliente
export async function createCustomer(customer:ICustomer) {
  const db = await connectDB();
  const result = await db.run(
    `INSERT INTO customers (customer_name, customer_email, customer_phone) VALUES (?, ?, ?)`,
    [customer.name, customer.email, customer.phone]
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
export async function updateCustomer(id: number, customer:ICustomer) {
  const db = await connectDB();
  const result = await db.run(
    `UPDATE customers SET customer_name = ?, customer_email = ?, customer_phone = ? WHERE customer_id = ?`,
    [customer.name, customer.email, customer.phone, id]
  );
  return result.changes;
}
