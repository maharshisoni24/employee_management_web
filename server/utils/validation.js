import { body } from 'express-validator';

export const employeeValidation = [
  body('name').notEmpty().trim().withMessage('Name is required'),
  body('contact_no')
    .isMobilePhone()
    .withMessage('Valid contact number is required'),
  body('department').notEmpty().trim().withMessage('Department is required'),
];

export const stockValidation = [
  body('name').notEmpty().trim().withMessage('Stock name is required'),
  body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a positive number'),
];

export const transactionValidation = [
  body('employee_id').isInt().withMessage('Valid employee ID is required'),
  body('stock_id').isInt().withMessage('Valid stock ID is required'),
  body('type')
    .isIn(['ISSUE', 'RETURN'])
    .withMessage('Invalid transaction type'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];
