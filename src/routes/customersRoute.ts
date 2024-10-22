import express, { Request, Response } from 'express';
import { validateCreateCustomer, validateCustomerId, validateUpdateCustomer } from '../middlewares/customersValidator';
import { validate } from '../middlewares/validate';
import { createCustomer, getAllCustomers, getCustomerById, updateCustomer } from '../services/customersService';

const router = express.Router();

// POST: Crear un nuevo cliente
router.post(
  '/customers',
  validateCreateCustomer,  // Middleware de validación modularizado
  validate,                // Middleware para manejar los resultados de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_name, customer_email, customer_phone } = req.body;
      const customerId = await createCustomer(customer_name, customer_email, customer_phone);
      res.status(201).json({ message: 'Cliente creado con éxito', customer_id: customerId });
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      res.status(500).json({ error: 'Error al crear el cliente' });
    }
  }
);

// GET: Obtener todos los clientes
router.get('/customers', async (req: Request, res: Response): Promise<void>  => {
  try {
    const customers = await getAllCustomers();
    res.status(200).json(customers);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
});

// GET: Obtener un cliente por su ID
router.get(
  '/customers/:id',
  validateCustomerId,  // Middleware de validación modularizado
  validate,            // Middleware para manejar los resultados de validación
  async (req: Request, res: Response):  Promise<void>  => {
    try {
      const { id } = req.params;
      const customer = await getCustomerById(parseInt(id));
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el cliente:', error);
      res.status(500).json({ error: 'Error al obtener el cliente' });
    }
  }
);

// PUT: Actualizar los datos de un cliente
router.put(
  '/customers/:id',
  validateUpdateCustomer,  // Middleware de validación modularizado
  validate,                // Middleware para manejar los resultados de validación
  async (req: Request, res: Response):  Promise<void>  => {
    try {
      const { id } = req.params;
      const { customer_name, customer_email, customer_phone } = req.body;
      const changes = await updateCustomer(parseInt(id), customer_name, customer_email, customer_phone);
      if (changes! > 0) {
        res.status(200).json({ message: 'Cliente actualizado con éxito' });
      } else {
        res.status(404).json({ message: 'Cliente no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el cliente:', error);
      res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
  }
);

export default router;
