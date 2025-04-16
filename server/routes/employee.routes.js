import express from 'express';
import { pool } from '../config/db.js';
import { employeeValidation } from '../utils/validation.js';
import { validationResult } from 'express-validator';
import { queries } from '../utils/queries.js';

const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(queries.getAllEmployees);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get employee by ID
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new employee
router.post('/', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Return errors if validation fails
  }
  const { name, email, department } = req.body;

  try {
    const [result] = await pool.query(
      'INSERT INTO employees (name, email, department) VALUES (?, ?, ?)',
      [name, email, department]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update employee
router.put('/:id', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, department } = req.body;
  try {
    const [result] = await pool.query(
      'UPDATE employees SET name = ?, email = ?, department = ? WHERE id = ?',
      [name, email, department, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete employee
router.delete('/:id', async (req, res) => {
  try {
    const [result] = await pool.query('DELETE FROM employees WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;