import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Package, Users, History, FileText, Settings } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Package, label: 'Manage Stocks', path: '/stocks' },
  { icon: Users, label: 'Employee Profiles', path: '/employees' },
  { icon: History, label: 'Transaction History', path: '/transactions' },
  { icon: FileText, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-sm">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Stock Manager</h1>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-gray-700 dark:text-gray-200 dark:hover:bg-gray-700 hover:bg-gray-100 ${
              location.pathname === item.path ? 'bg-gray-100 dark:bg-gray-700' : ''
            }`}
          >
            <item.icon className="h-5 w-5 mr-3" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}