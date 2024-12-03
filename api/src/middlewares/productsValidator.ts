import { body, param } from 'express-validator';

// Validación para crear un producto
export const validateCreateProduct = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('brand').notEmpty().withMessage('La marca es obligatoria'),
  body('category').notEmpty().withMessage('La categoría es obligatoria'),
  body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('available').toBoolean().isBoolean().withMessage('La disponibilidad debe ser un valor booleano (true/false)'),
  body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número mayor o igual a 0') // Aquí se corrigió
];

// Validación para actualizar un producto
export const validateUpdateProduct = [
  param('id').isInt().withMessage('El ID del producto debe ser un número entero'),
  body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío si se incluye'),
  body('brand').optional().notEmpty().withMessage('La marca no puede estar vacía si se incluye'),
  body('category').optional().notEmpty().withMessage('La categoría no puede estar vacía si se incluye'),
  body('price').optional().isFloat({ gt: 0 }).withMessage('El precio debe ser un número mayor a 0'),
  body('available').optional().isBoolean().withMessage('La disponibilidad debe ser un valor booleano (true/false)'),
  body('stock').optional().isInt({ min: 0 }).withMessage('El stock debe ser un número mayor o igual a 0')
];

// Validación para obtener un producto por su ID
export const validateProductId = [
  param('id').isInt().withMessage('El ID del producto debe ser un número entero')
];

// Validación para eliminar un producto por su ID
export const validateDeleteProduct = [
  param('id').isInt().withMessage('El ID del producto debe ser un número entero')
];

export const validateBulkCreateProducts = [
  body('*.name').notEmpty().withMessage('El nombre es obligatorio'),
  body('*.brand').notEmpty().withMessage('La marca es obligatoria'),
  body('*.category').notEmpty().withMessage('La categoría es obligatoria'),
  body('*.price')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a 0'),
  body('*.available')
    .toBoolean()
    .isBoolean()
    .withMessage('La disponibilidad debe ser un valor booleano (true/false)'),
  body('*.stock')
    .isInt({ min: 0 })
    .withMessage('El stock debe ser un número mayor o igual a 0')
];

export const validateUpdatePrice = [
  body('price').notEmpty().isFloat({gt:0}).withMessage('El precio debe ser un número mayor a 0'),
  body('category').notEmpty().withMessage('La categoría es obligatoria')
]