import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ThemeToggle } from '../common/ThemeToggle';
import { LayoutDashboard, CheckSquare, Settings } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <CheckSquare className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                DevTracker
              </span>
            </Link>
          </div>

          <div className="items-center hidden space-x-4 md:flex">
            {navItems.map(({ path, icon: Icon, label }) => (
              <Link
                key={path}
                to={path}
                className="relative px-3 py-2 text-sm font-medium rounded-md"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </div>
                {location.pathname === path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600 dark:bg-indigo-400"
                    initial={false}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};