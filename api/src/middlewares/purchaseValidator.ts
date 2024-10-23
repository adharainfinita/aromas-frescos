import { body, param } from 'express-validator';

export const validateCreatePurchase = [
  body('purchase.customerId').isInt().withMessage('El ID del cliente debe ser un número entero'),
  body('purchase.totalAmount').isFloat({ gt: 0 }).withMessage('El monto total debe ser mayor a 0'),
  body('purchase.paid').isBoolean().withMessage('El estado de pago debe ser booleano'),
  body('details').isArray().withMessage('Los detalles deben ser un array'),
  body('details.*.productId').isInt().withMessage('El ID del producto debe ser un número entero'),
  body('details.*.quantity').isInt({ gt: 0 }).withMessage('La cantidad debe ser mayor que 0'),
  body('details.*.pricePerUnit').isFloat({ gt: 0 }).withMessage('El precio por unidad debe ser mayor que 0'),
];

export const validatePurchaseId = [
  param('id').isInt().withMessage('El ID de la compra debe ser un número entero'),
];
