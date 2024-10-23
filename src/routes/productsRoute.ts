import express, { Request, Response } from 'express';
import { validateCreateProduct, validateProductId, validateUpdateProduct } from '../middlewares/productsValidator';
import { validate } from '../middlewares/validate';
import { createProduct, getAllProducts, getProductById, updateProduct } from '../services/productsService';

const router = express.Router();

// POST: Crear un nuevo producto
router.post(
  '/',
  validateCreateProduct,  // Validaciones de creación de productos
  validate,               // Middleware para manejar resultados de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const productId = await createProduct(req.body);
      res.status(201).json({ message: 'Producto creado con éxito', product_id: productId });
    } catch (error) {
      console.error('Error al crear el producto:', error);
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  }
);

// GET: Obtener todos los productos
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// GET: Obtener un producto por su ID
router.get(
  '/:id',
  validateProductId,  // Validación del ID del producto
  validate,           // Middleware para manejar resultados de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const product = await getProductById(parseInt(id));
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error);
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
  }
);

// PUT: Actualizar un producto
router.put(
  '/:id',
  validateUpdateProduct,  // Validaciones para la actualización de productos
  validate,               // Middleware para manejar resultados de validación
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updated = await updateProduct(parseInt(id), req.body);
      if (updated) {
        res.status(200).json({ message: 'Producto actualizado con éxito' });
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error);
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }
);

export default router;
