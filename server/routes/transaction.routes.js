import express from 'express';
import { pool } from '../config/db.js';
import { transactionValidation } from '../utils/validation.js';
import { validationResult } from 'express-validator';
import { queries } from '../utils/queries.js';

const router = express.Router();

// Get all transactions
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(queries.getTransactions);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all stocks
router.get('/stocks', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM stocks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all employees
router.get('/employees', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name FROM employees');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT t.*, s.name as stock_name, e.name as employee_name
      FROM transactions t
      JOIN stocks s ON t.stock_id = s.id
      JOIN employees e ON t.employee_id = e.id
      WHERE t.id = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new transaction
router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { stock_id, employee_id, type, quantity } = req.body;
  const connection = await pool.getConnection();
  
  try {
    await connection.beginTransaction();

    // Create transaction record
    const [result] = await connection.query(
      'INSERT INTO transactions (stock_id, employee_id, type, quantity) VALUES (?, ?, ?, ?)',
      [stock_id, employee_id, type, quantity]
    );

    // Update stock quantity
    const quantityChange = type === 'ISSUE' ? -quantity : quantity;
    await connection.query(
      'UPDATE stocks SET quantity = quantity + ? WHERE id = ?',
      [quantityChange, stock_id]
    );

    await connection.commit();
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
});

// Update transaction status
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE transactions SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.json({ message: 'Transaction updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});




export default router;