import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import EmployeeCards from '../components/EmployeeCards';
import { AddEmployeeModal } from '../components/AddEmployeeModal';

export default function Employees() {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleModalClose = () => {
    setIsModalOpen(false);
    queryClient.invalidateQueries('employees'); // Refresh the employee list after adding
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold dark:text-white">Employee Profiles</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Employee
        </button>
      </div>
      <EmployeeCards/>
      <AddEmployeeModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
  
}
