import { motion } from 'framer-motion';
import { TaskBoard } from '../components/task/TaskBoard';
import { TaskList } from '../components/task/TaskList';
import { TaskStats } from '../components/dashboard/TaskStats';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { LayoutGrid, ListTodo, Search } from 'lucide-react';
import { useState } from 'react';
import { useTaskStore } from '@/store/useTaskStore';
import { useAuth } from '@/contexts/AuthContext';

export const DashboardPage = () => {
  const [view, setView] = useState<'board' | 'list'>('board');
  const [search, setSearch] = useState('');
  const tasks = useTaskStore((state) => state.tasks);
  const { user } = useAuth();

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl min-h-screen sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome back {user?.name}!</h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Here's what's happening with your tasks today.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 md:w-64">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="py-2 pr-4 pl-10 w-full text-sm rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-white"
            />
          </div>
          <div className="flex items-center p-1 bg-gray-100 rounded-lg dark:bg-gray-700">
            <button
              onClick={() => setView('board')}
              className={`p-2 rounded-md transition-colors ${
                view === 'board'
                  ? 'bg-white text-indigo-600 shadow dark:bg-gray-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-md transition-colors ${
                view === 'list'
                  ? 'bg-white text-indigo-600 shadow dark:bg-gray-600 dark:text-indigo-400'
                  : 'text-gray-500 hover:text-gray-900 dark:hover:text-gray-300'
              }`}
            >
              <ListTodo className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <div className="overflow-hidden bg-white rounded-xl shadow-sm dark:bg-gray-800">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Task Statistics</h2>
              <TaskStats />
            </div>
          </div>
          <div className="overflow-hidden bg-white rounded-xl shadow-sm dark:bg-gray-800 lg:col-span-2">
            <div className="p-6">
              <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              <RecentActivity />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="overflow-hidden bg-white rounded-xl shadow-sm dark:bg-gray-800"
        >
          <div className="p-6">
            {view === 'board' ? <TaskBoard filteredTasks={filteredTasks} /> : <TaskList filteredTasks={filteredTasks} />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};