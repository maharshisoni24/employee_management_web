import React, { useState } from 'react';
import { handleNewIssuance, handleRecordReturn } from '../scripts/buttonsScript';
import RecordReturnModal from '../components/RecordReturnModal';
import NewIssuanceModal from '../components/NewIssuanceModal';
import { TransactionTable } from '../components/TransactionTable';

export default function Transactions() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [isIssuanceModalOpen, setIssuanceModalOpen] = useState(false);
  const [isReturnModalOpen, setReturnModalOpen] = useState(false);

  return (
    <div className="space-y-6">
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

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Transaction History</h1>
        <div className="flex space-x-3">
          <button
            onClick={() => setIssuanceModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            New Issuance
          </button>
          <button
            onClick={() => setReturnModalOpen(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Record Return
          </button>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <TransactionTable refreshKey={refreshKey} />
      </div>
    </div>
  );
}
