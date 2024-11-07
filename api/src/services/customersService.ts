import { connectDB } from '../db/db.js';

interface ICustomer {
  name: string;
  email?: string;
  phone: string;
}

// Función para crear un nuevo cliente
export async function createCustomer(customer: ICustomer) {
  const client = await connectDB();
  if(!customer.email) customer.email = "sincorreo@mail.com"
  try {
    const result = await client.query(
      `INSERT INTO customers (customer_name, customer_email, customer_phone) VALUES ($1, $2, $3) RETURNING customer_id`,
      [customer.name, customer.email, customer.phone]
    );
    return result.rows[0].customer_id;
  } finally {
    client.release();
  }
}

// Función para obtener todos los clientes
export async function getAllCustomers() {
  const client = await connectDB();
  try {
    const result = await client.query('SELECT * FROM customers');
    return result.rows;
  } finally {
    client.release();
  }
}

// Función para obtener un cliente por su ID
export async function getCustomerById(id: number) {
  const client = await connectDB();
  try {
    const result = await client.query('SELECT * FROM customers WHERE customer_id = $1', [id]);
    return result.rows[0];
  } finally {
    client.release();
  }
}

// Función para actualizar un cliente
export async function updateCustomer(id: number, customer: ICustomer) {
  const client = await connectDB();
  try {
    const result = await client.query(
      `UPDATE customers SET customer_name = $1, customer_email = $2, customer_phone = $3 WHERE customer_id = $4 RETURNING *`,
      [customer.name, customer.email, customer.phone, id]
    );
    return result.rowCount;
  } finally {
    client.release();
  }
}
