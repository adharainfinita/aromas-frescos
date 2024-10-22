import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

// Abrir conexión a la base de datos
export async function connectDB(): Promise<Database> {
  const db = await open({
    filename: './my-database.db',
    driver: sqlite3.Database
  });
  return db;
}
