import { useEffect, useState } from "react";
import { fetchTransactions } from "../scripts/dataScripts";

type Transaction = {
  id: number;
  stock_id: number;
  employee_id: number;
  type: string;
  quantity: number;
  transaction_date: string;
  status: string;
  stock_name: string;
  employee_name: string;
};

export function TransactionTable({ refreshKey }: { refreshKey: number }) {
  // Import the reusable fetchTransactions function

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions(); // Call the reusable function
        setTransactions(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Fetch transactions on component mount or when refreshKey changes
  }, [refreshKey]); // Refetch when refreshKey changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Employee Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Stock Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-white uppercase tracking-wider">
              Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">
                {transaction.employee_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">
                {transaction.stock_name}
              </td>
              <td
                className={`px-6 py-4 whitespace-nowrap ${transaction.type === "ISSUE"? "text-rose-600": transaction.type === "RETURN"? "text-green-700": "dark:text-gray-100"}`}
              >
                {transaction.type}
              </td>

              <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">
                {transaction.quantity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap dark:text-gray-100">
                {new Date(transaction.transaction_date).toLocaleString("en-GB")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
