import { Router } from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const router = Router();

async function connectDB() {
  return open({ filename: './my-database.db', driver: sqlite3.Database });
}

// Obtener todos los clientes
router.get('/customers', async (req, res) => {
  const db = await connectDB();
  const customers = await db.all('SELECT * FROM customers');
  res.json(customers);
});

// Crear un nuevo cliente
router.post('/customers', async (req, res) => {
  const { name, email, phone } = req.body;
  const db = await connectDB();
  await db.run('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
  res.status(201).send('Cliente creado');
});

export default router;
