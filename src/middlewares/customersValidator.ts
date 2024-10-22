import { body, param } from 'express-validator';

export const validateCreateCustomer = [
  body('customer_name').notEmpty().withMessage('El nombre es obligatorio'),
  body('customer_email').isEmail().optional().withMessage('Debe ser un email válido'),
  body('customer_phone').isMobilePhone('any').withMessage('Debe ser un número de teléfono válido')
];

export const validateCustomerId = [
  param('id').isInt().withMessage('El ID debe ser un número entero')
];

export const validateUpdateCustomer = [
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('customer_name').notEmpty().withMessage('El nombre es obligatorio'),
  body('customer_email').isEmail().optional().withMessage('Debe ser un email válido'),
  body('customer_phone').isMobilePhone('any').withMessage('Debe ser un número de teléfono válido')
];
