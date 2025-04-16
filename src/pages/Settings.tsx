import React from 'react';
import { Bell, Lock, User, Database, Mail } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold dark:text-white">Settings</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium dark:text-white">Profile Settings</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-3 dark:text-gray-100" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Name</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 dark:text-gray-100 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium dark:text-gray-100">Security</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-gray-400 dark:text-gray-100 mr-3" />
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-100">Password</label>
                    <button className="mt-1 text-blue-600 hover:text-blue-800">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium dark:text-gray-100">Notifications</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 text-gray-400 dark:text-gray-100 mr-3" />
                  <div className="flex-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                      <span className="ml-2 dark:text-gray-100">Email Notifications</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium dark:text-gray-100">Database</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <Database className="h-5 w-5 text-gray-400 mr-3 dark:text-gray-100" />
                  <div className="flex-1">
                    <button className="text-blue-600 hover:text-blue-800">
                      Backup Database
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button className="px-4 py-2 border rounded-md hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-800 dark:text-white">
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}