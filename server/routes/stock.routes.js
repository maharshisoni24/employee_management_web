import express from "express";
import { pool } from "../config/db.js";
import { queries } from "../utils/queries.js";
import { stockValidation } from "../utils/validation.js";
import { validationResult } from "express-validator";

const router = express.Router();

// Get all stocks
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(queries.getStockInventory);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new stock
router.post("/", stockValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send validation errors as an alert-friendly format
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ alert: errorMessages.join("\n") });
  }

  const { name, category_id, quantity, unit_price } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO stocks (name, category_id, quantity) VALUES (?, ?, ?)",
      [name, category_id, quantity, unit_price]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update stock by ID
router.put("/:id", stockValidation, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Send validation errors as an alert-friendly format
    const errorMessages = errors.array().map((err) => err.msg);
    return res.status(400).json({ alert: errorMessages.join("\n") });
  }

  const { id } = req.params;
  const { name, category_id, quantity, unit_price } = req.body;
  try {
    const [result] = await pool.query(
      "UPDATE stocks SET name = ?, category_id = ?, quantity = ?, unit_price = ? WHERE id = ?",
      [name, category_id, quantity, unit_price, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.status(200).json({ message: "Stock updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete stock by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [stock] = await pool.query("SELECT * FROM stocks WHERE id = ?", [id]);
    if (!stock.length) {
      return res.status(404).json({ message: "Stock not found" });
    }
    const [result] = await pool.query("DELETE FROM stocks WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
