
import { useState } from 'react';
import { StockModal } from '../components/StockModal';
import { StockTable } from '../components/StockTable';

export default function Stocks() {
  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Stock Inventory</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
        Add New Item
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <StockTable />
      </div>
      <StockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}