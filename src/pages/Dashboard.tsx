import React from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import { TransactionTable } from '../components/TransactionTable';
import { Package, RefreshCcw, AlertCircle, DollarSign } from 'lucide-react';
import { useQuery } from 'react-query';
import { stockApi, transactionApi } from '../services/api';
import { handleNewIssuance, handleRecordReturn } from '../scripts/buttonsScript';
import RecordReturnModal from '../components/RecordReturnModal';
import NewIssuanceModal from '../components/NewIssuanceModal';
import { useState } from 'react';
import { StockModal } from '../components/StockModal';

export default function Dashboard() {
  const { data: stocks } = useQuery('stocks', stockApi.getAll);
  const { data: transactions } = useQuery('transactions', transactionApi.getAll);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isIssuanceModalOpen, setIssuanceModalOpen] = useState(false);
  const [isReturnModalOpen, setReturnModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">

      <StockModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <NewIssuanceModal
        isOpen={isIssuanceModalOpen}
        onClose={() => setIssuanceModalOpen(false)}
        onSubmit={(formData:any) => handleNewIssuance(formData, setRefreshKey)} // Pass function with refreshKey
      />
      <RecordReturnModal
        isOpen={isReturnModalOpen}
        onClose={() => setReturnModalOpen(false)}
        onSubmit={(formData:any) => handleRecordReturn(formData, setRefreshKey)} // Pass function with refreshKey
      />
      {/* Quick Actions */}
      <div className="flex justify-between items-center gap-4">
      {/* Left Buttons */}
        <div className="flex gap-4">
          <button
            onClick={() => setIssuanceModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            New Issuance
          </button>
          <button
            onClick={() => setReturnModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Record Return
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-4">
          <button className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 dark:bg-yellow-500 dark:hover:bg-yellow-600">
            Add Stocks
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600">
            Add New Item
          </button>
        </div>
      </div>


      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Stocks"
          value={stocks?.data?.length || 0}
          icon={Package}
          trend={3}
        />
        <StatsCard
          title="Returns"
          value={transactions?.data?.filter((t: any) => t.type === 'return').length || 0}
          icon={RefreshCcw}
          trend={-2}
        />
        <StatsCard
          title="Pending Returns"
          value={transactions?.data?.filter((t: any) => t.status === 'pending').length || 0}
          icon={AlertCircle}
          trend={8}
        />
        <StatsCard
          title="Total Value"
          value={`$${transactions?.data?.reduce((acc: number, t: any) => acc + Number(t.amount), 0).toFixed(2) || '0'}`}
          icon={DollarSign}
          trend={15}
        />
      </div>
      {/* Transactions Table */}
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 hover:scrollbar-thumb-blue-700">
        <h1 className="text-2xl font-semibold dark:text-white">Transactions</h1> <br />
        <TransactionTable refreshKey={refreshKey} />
      </div>
    </div>
  );
}