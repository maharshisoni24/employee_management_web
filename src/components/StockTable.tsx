import { useEffect, useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import axios from 'axios';
import { StockModal } from './StockModal'; // Assuming StockModal is defined elsewhere
import { format } from 'date-fns';

type Stock = {
  id: string;
  name: string;
  quantity: number;
  category_name: string;
  updated_at: string;
};

export function StockTable() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch stocks from the server
  const fetchStocks = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/stocks');
      setStocks(Array.isArray(response.data) ? response.data : []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stocks.');
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchStocks();
  }, []);

  // Open modal for editing a stock
  const handleEdit = (stock: Stock) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  // Delete a stock from the database
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this stock?');
    if (!confirmed) return;
  
    try {
      const response = await axios.delete(`http://localhost:3000/api/stocks/${id}`); // Use relative URL with a configured base URL
      if (response.status === 200) {
        setStocks((prevStocks) => prevStocks.filter((stock) => stock.id !== id));
        alert('Stock deleted successfully!');
      }
    } catch (error: any) {
      console.error('Error deleting stock:', error);
      if (error.response) {
        // Server responded with a status other than 200 range
        const errorMessage = error.response.data.message || 'Failed to delete stock. Please try again.';
        alert(errorMessage);
      } else {
        // No response received
        alert('Failed to delete stock. The server may be down.');
      }
      await fetchStocks();
    }
  };
  

  // Close the modal and optionally update the stocks
  const closeModal = async (updatedStock?: Stock) => {
    setIsModalOpen(false);
    setSelectedStock(null);

    if (updatedStock) {
      setStocks((prevStocks) =>
        prevStocks.map((stock) =>
          stock.id === updatedStock.id ? { ...stock, ...updatedStock } : stock
        )
      );
    }

    await fetchStocks();
    
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Item Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Last Updated
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <tr key={stock.id}>
                
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">{stock.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">{stock.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">{format(new Date(stock.updated_at), 'yyyy-MM-dd HH:mm:ss')}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(stock)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(stock.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="px-6 py-4 whitespace-nowrap" colSpan={5}>
                No stocks available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Stock Modal */}
      {isModalOpen && selectedStock && (
        <StockModal
          isOpen={isModalOpen}
          onClose={closeModal}
          stock={selectedStock}
        />
      )}
    </div>
  );
}
