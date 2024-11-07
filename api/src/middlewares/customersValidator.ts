import { body, param } from 'express-validator';

export const validateCreateCustomer = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('phone').isMobilePhone('any').withMessage('Debe ser un número de teléfono válido')
];

export const validateCustomerId = [
  param('id').isInt().withMessage('El ID debe ser un número entero')
];

export const validateUpdateCustomer = [
  param('id').isInt().withMessage('El ID debe ser un número entero'),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email').isEmail().optional().withMessage('Debe ser un email válido'),
  body('phone').isMobilePhone('any').withMessage('Debe ser un número de teléfono válido')
];
