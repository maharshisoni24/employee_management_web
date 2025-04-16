// Header.tsx
import { Bell, Sun, Moon } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext

export default function Header() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const { logout } = useAuth(); // Use the logout function from AuthContext

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="relative">
          <button className="flex items-center space-x-3 px-3 rounded-lg border border-gray-300 hover:bg-gray-400 dark:border-gray-700">
            <img
              src="../assets/profile.png"
              alt="User Avatar"
              className="h-12 w-12 rounded-full"
            />
            <span className="text-lg font-semibold dark:text-white">John Doe</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 dark:text-white">
          <button className="p-2 rounded-lg hover:bg-gray-400">
            <Bell className="h-5 w-5" />
          </button>
          <button
            className="p-2 rounded-lg hover:bg-gray-400 dark:text-white"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
