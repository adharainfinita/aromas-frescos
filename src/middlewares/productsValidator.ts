import { body, param } from 'express-validator';

//Validación para crear un producto
export const validateCreateProduct = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('brand').notEmpty().withMessage('La marca es obligatoria'),
  body('category').notEmpty().withMessage('La cateogría es obligatoria'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('availabe').isBoolean().withMessage('La disponibilidad debe ser un valor booleano (true/false)'),
  body('discontinued').optional().isBoolean().withMessage('El estado "discontinuado" debe ser un valor booleano')
];

// Validación para actualizar un producto
export const validateUpdateProduct = [
  param('product_id').isInt().withMessage('El ID del producto debe ser un número entero'),
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío si se incluye'),
  body('brand').optional().notEmpty().withMessage('La marca no puede estar vacía si se incluye'),
  body('category').optional().notEmpty().withMessage('La categoría no puede estar vacía si se incluye'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('availabe').optional().isBoolean().withMessage('La disponibilidad debe ser un valor booleano (true/false)'),
  body('discontinued').optional().isBoolean().withMessage('El estado "discontinuado" debe ser un valor booleano')
];

// Validación para obtener un producto por su ID
export const validateProductId = [
  param('id').isInt().withMessage('El ID del producto debe ser un número entero')
];

// Validación para eliminar un producto por su ID
export const validateDeleteProduct = [
  param('id').isInt().withMessage('El ID del producto debe ser un número entero')
];