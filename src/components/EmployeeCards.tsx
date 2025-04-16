import { Users, Phone, Building } from 'lucide-react';
import { employeeApi } from '../services/api';
import { useQuery } from 'react-query';



export default function EmployeeCards(){
    const { data: employees, isLoading } = useQuery('employees', employeeApi.getAll);
    if (isLoading) return <div>Loading...</div>;
    return(
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees?.data?.map((employee: any) => (
          <div
            key={employee.employee_id}
            className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-lg shadow-sm p-6 border"
          >
            {/* Header: Employee Details */}
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold dark:text-white">{employee.employee_name}</h3>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Phone className="h-4 w-4 mr-1" />
                  {employee.contact_no}
                </div>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Building className="h-4 w-4 mr-1" />
                  {employee.department}
                </div>
              </div>
            </div>

            {/* Stats: Total Issued, Returned, Pending */}
            <div className="mt-4 pt-4 border-t dark:border-gray-700 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Issued</p>
                <p className="font-semibold dark:text-white">{employee.total_issued || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Total Returned</p>
                <p className="font-semibold dark:text-white">{employee.total_returned || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
                <p className="font-semibold dark:text-white">
                  {(employee.total_issued || 0) - (employee.total_returned || 0)}
                </p>
              </div>
            </div>

            {/* Scrollable Stock Details Table */}
            <div className="mt-4">
              <div className="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                <div className="max-h-32 overflow-y-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <tbody>
                      {employee.stock_details?.map((stock:any, index:any) => (
                        <tr
                          key={index}
                          className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          <td className="px-4 py-2">{stock.stock_name}</td>
                          <td className="px-4 py-2">{stock.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* View All Transactions Button */}
            <div className="mt-4">
              <button className="w-full px-4 py-2 text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700">
                View All Transactions
              </button>
            </div>
          </div>
        ))}
      </div>
        </div>
    )
}