import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { X } from 'lucide-react';


interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  stock?: {
    id: string;
    name: string;
    quantity: number;
    category_id: string;
  };
}

export function StockModal({ isOpen, onClose, stock }: StockModalProps) {

    const [formData, setFormData] = useState({
      name: stock?.name || '',
      quantity: stock?.quantity || 0,
      category_id: stock?.category_id || '',
    });
  
    // Update formData when stock prop changes
    useEffect(() => {
      setFormData({
        name: stock?.name || '',
        quantity: stock?.quantity || 0,
        category_id: stock?.category_id || '',
      });
    }, [isOpen, stock]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    if(stock){e.preventDefault();};

    try {
      setIsSubmitting(true);

      if (stock) {
        // Update stock logic (if `stock` is passed)
        await axios.put(`http://localhost:3000/api/stocks/${stock.id}`, formData);
        alert('Stock updated successfully!');
      } else {
        // Add new stock logic
        await axios.post('http://localhost:3000/api/stocks', formData);
        alert('Stock added successfully!');
      }
      onClose();
    } catch (error: any) {
      console.error('Error submitting form:', error.message);
      alert('Failed to save stock. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-700 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">
            {stock ? 'Edit Stock' : 'Add New Stock'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Item Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Quantity
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: parseInt(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">
                Category ID
              </label>
              <input
                type="text"
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({ ...formData, category_id: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : stock ? 'Update' : 'Add'} Stock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
