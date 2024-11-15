import { motion } from 'framer-motion';
import { useTaskStore } from '../../store/useTaskStore';
import { Clock } from 'lucide-react';

export const RecentActivity = () => {
  const tasks = useTaskStore((state) => state.tasks);
  
  const recentTasks = [...tasks]
  .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  .slice(0, 3);

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="mb-6 text-xl font-semibold">Recent Activity</h2>
      <div className="space-y-4">
        {recentTasks.map((task, index) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start p-4 space-x-4 rounded-lg bg-gray-50 dark:bg-gray-700"
          >
            <Clock className="w-5 h-5 mt-1 text-gray-400" />
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Status: {task.status.name}
              </p>
              <time className="text-xs text-gray-500">
                {new Date(task.updatedAt).toLocaleString()}
              </time>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};