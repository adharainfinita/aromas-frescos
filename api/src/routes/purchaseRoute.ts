import express, { Request, Response } from 'express';
import { createPurchase, getAllPurchases, getPurchaseById, updatePurchase } from '../services/purchaseService.js';
import { validateCreatePurchase, validatePurchaseId } from '../middlewares/purchaseValidator.js';
import { validate } from '../middlewares/validate.js';

const router = express.Router();

// POST: Crear una nueva compra
router.post(
  '/',
  validateCreatePurchase,  // Validaciones de creación de compras
  validate,                // Middleware para manejar errores de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const purchaseId = await createPurchase(req.body.purchase, req.body.details);
      res.status(201).json({ message: 'Compra creada con éxito', purchase_id: purchaseId });
    } catch (error) {
      console.error('Error al crear la compra:', error);
      res.status(500).json({ error: 'Error al crear la compra' });
    }
  }
);

// GET: Obtener todas las compras
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const purchases = await getAllPurchases();
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
});

// GET: Obtener una compra por ID
router.get(
  '/:id',
  validatePurchaseId,  // Validación del ID de compra
  validate,            // Middleware para manejar errores de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const purchase = await getPurchaseById(parseInt(id));
      if (purchase.purchase) {
        res.status(200).json(purchase);
      } else {
        res.status(404).json({ message: 'Compra no encontrada' });
      }
    } catch (error) {
      console.error('Error al obtener la compra:', error);
      res.status(500).json({ error: 'Error al obtener la compra' });
    }
  }
);

// PUT: Actualizar una compra
router.put(
  '/:id',
  validatePurchaseId,  // Validación del ID de compra
  validate,            // Middleware para manejar errores de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updated = await updatePurchase(parseInt(id), req.body.purchase);
      if (updated) {
        res.status(200).json({ message: 'Compra actualizada con éxito' });
      } else {
        res.status(404).json({ message: 'Compra no encontrada' });
      }
    } catch (error) {
      console.error('Error al actualizar la compra:', error);
      res.status(500).json({ error: 'Error al actualizar la compra' });
    }
  }
);

export default router;
