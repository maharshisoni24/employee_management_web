export const queries = {
  getAllEmployees: `
    SELECT 
        e.id AS employee_id,
        e.name AS employee_name,
        e.contact_no,
        e.department,
        COUNT(t.id) AS total_transactions,
        SUM(CASE WHEN t.type = 'ISSUE' THEN t.quantity ELSE 0 END) AS total_issued,
        SUM(CASE WHEN t.type = 'RETURN' THEN t.quantity ELSE 0 END) AS total_returned,
        (
            SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                    'stock_name', stock_name,
                    'quantity', total_quantity
                )
            )
            FROM (
                SELECT 
                    s.name AS stock_name,
                    SUM(CASE 
                        WHEN t.type = 'ISSUE' THEN t.quantity 
                        WHEN t.type = 'RETURN' THEN -t.quantity 
                        ELSE 0 
                    END) AS total_quantity
                FROM transactions t
                LEFT JOIN stocks s ON t.stock_id = s.id
                WHERE t.employee_id = e.id
                GROUP BY s.id, s.name
            ) AS stock_details
        ) AS stock_details
    FROM employees e
    LEFT JOIN transactions t ON e.id = t.employee_id
    GROUP BY e.id, e.name, e.contact_no, e.department;
    `,
  
  getEmployeeTransactions: `
    SELECT 
    t.*, 
    s.name AS stock_name 
  FROM transactions t 
  JOIN stocks s ON t.stock_id = s.id 
  WHERE t.employee_id = ? 
  ORDER BY t.transaction_date DESC
  `,
  
  getStockInventory: `
    SELECT 
      s.*,
      COUNT(t.id) AS total_transactions,
      SUM(CASE WHEN t.type = 'ISSUE' THEN t.quantity ELSE 0 END) AS total_issued,
      SUM(CASE WHEN t.type = 'RETURN' THEN t.quantity ELSE 0 END) AS total_returned
    FROM stocks s
    LEFT JOIN transactions t ON s.id = t.stock_id
    GROUP BY s.id
    ORDER BY s.created_at ASC
  `,
  getTransactions:`
  SELECT 
    t.*, 
    s.name AS stock_name, 
    e.name AS employee_name 
  FROM transactions t
  JOIN stocks s ON t.stock_id = s.id
  JOIN employees e ON t.employee_id = e.id
  ORDER BY t.transaction_date DESC
  `
};
