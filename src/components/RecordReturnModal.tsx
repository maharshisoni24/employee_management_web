import axios from 'axios';
import React, { useState,useEffect } from 'react';

export default function RecordReturnModal({ isOpen, onClose, onSubmit }: any) {
  const [formData, setFormData] = useState({
    stock_id: '',
    employee_id: '',
    quantity: '',
  });
  const [stocks, setStocks] = useState([]);
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    if (isOpen) {
      // Fetch stocks
      axios.get('http://localhost:3000/api/transactions/stocks')
        .then((response) => setStocks(response.data))
        .catch((error) => console.error('Error fetching stocks:', error));

      // Fetch employees
      axios.get('http://localhost:3000/api/transactions/employees')
        .then((response) => setEmployees(response.data))
        .catch((error) => console.error('Error fetching employees:', error));
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      stock_id: '',
      employee_id: '',
      quantity: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold dark:text-white mb-4">Record Return</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Stock</label>
            <select
              name="stock_id"
              value={formData.stock_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Stock</option>
              {stocks.map((stock: { id: number; name: string }) => (
                <option key={stock.id} value={stock.id}>
                  {stock.name}
                </option>
              ))}
              </select>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Employee</label>
            <select
              name="employee_id"
              value={formData.employee_id}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee: { id: number; name: string }) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
