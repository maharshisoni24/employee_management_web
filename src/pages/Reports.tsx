import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { stockApi, transactionApi } from "../services/api";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import axios from "axios";

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
type Stock = {
  id: string;
  name: string;
  quantity: number;
  category_name: string;
  updated_at: string;
};

export default function Reports() {
  const { data: stocks } = useQuery<Stock[]>("stocks", stockApi.getAll);
  const { data: transactions } = useQuery<Transaction[]>(
    "transactions",
    transactionApi.getAll
  );

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/transactions/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  });

  const filterTransactions = (transactions: Transaction[]) => {
    if (!transactions) return [];
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.transaction_date)
        .toISOString()
        .split("T")[0];
      const isAfterFrom = !fromDate || transactionDate >= fromDate;
      const isBeforeTo = !toDate || transactionDate <= toDate;
      return isAfterFrom && isBeforeTo;
    });
  };

  const generatePdf = (filteredTransactions: Transaction[], title: string) => {
    if (!filteredTransactions.length) {
      alert("No transactions to export!");
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to download the ${title} report?`
    );
    if (!confirmed) return;

    const pdf = new jsPDF("landscape");
    const headers = ["Employee Name", "Stock Name", "Type", "Quantity", "Date"];
    const dateRange =
      fromDate && toDate
        ? `From ${new Date(fromDate).toLocaleDateString("en-GB")} to ${new Date(
            toDate
          ).toLocaleDateString("en-GB")}`
        : "All Dates";

    pdf.text(title, 15, 15);
    pdf.text(dateRange, 15, 25); // Add date range under the title

    const tableData = filteredTransactions.map((transaction) => [
      transaction.employee_name,
      transaction.stock_name,
      transaction.type,
      transaction.quantity,
      new Date(transaction.transaction_date).toLocaleString("en-GB"),
    ]);

    // Add totals row
    const totalIssue = filteredTransactions
      .filter((transaction) => transaction.type === "ISSUE")
      .reduce((sum, transaction) => sum + transaction.quantity, 0);

    const totalReturn = filteredTransactions
      .filter((transaction) => transaction.type === "RETURN")
      .reduce((sum, transaction) => sum + transaction.quantity, 0);

    tableData.push([
      "TOTAL",
      `ISSUE:${totalIssue}`,
      `RETURN:${totalReturn}`,
      `DUE: ${totalIssue - totalReturn}`,
      "",
    ]);

    autoTable(pdf, {
      startY: 30,
      head: [headers],
      body: tableData,
      styles: { fontSize: 10, cellWidth: "wrap", lineWidth: 0.1 },
      tableLineColor: [0, 0, 0], // Add table border
      didParseCell: (data) => {
        if (data.section === "body" && data.column.index === 2) {
          const type = data.cell.raw;
          if (type === "ISSUE") {
            data.cell.styles.textColor = [255, 0, 0]; // Red for 'issue'
          } else if (type === "RETURN") {
            data.cell.styles.textColor = [0, 128, 0]; // Green for 'return'
          }
        }
      },
    });

    pdf.save(`${title.replace(/\s+/g, "_")}.pdf`);
  };

  const handleExportAll = () => {
    const filteredTransactions = filterTransactions(transactions || []);
    generatePdf(filteredTransactions, "All Transactions Report");
  };

  const handleExportEmployee = () => {
    const filteredTransactions = filterTransactions(transactions || []).filter(
      (transaction) => transaction.employee_name.toString() === selectedEmployee
    );
    generatePdf(
      filteredTransactions,
      `Transactions for Employee: ${selectedEmployee}`
    );
  };

  const handleExportStock = () => {
    const filteredTransactions = filterTransactions(transactions || []).filter(
      (transaction) => transaction.stock_name.toString() === selectedStock
    );
    generatePdf(
      filteredTransactions,
      `Transactions for Stock: ${selectedStock}`
    );
  };

  if (!transactions || !stocks) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Export All Transactions */}
      <div className="flex flex-col space-y-4 p-4 rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-lg font-medium dark:text-white">
          Export All Transactions
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium dark:text-white">
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium dark:text-white">
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={handleExportAll}
          >
            <Download className="h-4 w-4 mr-2" />
            Export All Transactions
          </button>
        </div>
      </div>

      {/* Export Employee Transactions */}
      <div className="flex flex-col space-y-4 p-4 rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-lg font-medium dark:text-white">
          Export Employee Transactions
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div>
              <label className="block text-sm font-medium dark:text-white">
                Select Employee
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Employees</option>
                {employees.map((employee: { id: number; name: string }) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800"
            onClick={handleExportEmployee}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Employee Transactions
          </button>
        </div>
      </div>

      {/* Export Stock Transactions */}
      <div className="flex flex-col space-y-4 p-4 rounded-lg bg-white dark:bg-gray-800">
        <h2 className="text-lg font-medium dark:text-white">
          Export Stock Transactions
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4 items-center">
            <div>
              <label className="block text-sm font-medium dark:text-white">
                Select Stock
              </label>
              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className="px-4 py-2 rounded-lg border focus:outline-none dark:bg-gray-800 dark:text-white"
              >
                <option value="">All Stocks</option>
                {stocks.map((stock: any) => (
                  <option key={stock.id} value={stock.name}>
                    {stock.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-800"
            onClick={handleExportStock}
          >
            <Download className="h-4 w-4 mr-2" />
            Export Stock Transactions
          </button>
        </div>
      </div>
    </div>
  );
}
