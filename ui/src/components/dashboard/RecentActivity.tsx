import { motion, AnimatePresence } from 'framer-motion';
import { useTaskStore } from '../../store/useTaskStore';
import { Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Task } from '../../types/task';

export const RecentActivity = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const [recentTasks, setRecentTasks] = useState<Task[]>([]);
  const [prevTasks, setPrevTasks] = useState<Task[]>([]);

  useEffect(() => {
    const sortedTasks = tasks
      .slice()
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 3);

    // Only update if there are actual changes
    if (JSON.stringify(sortedTasks) !== JSON.stringify(recentTasks)) {
      setPrevTasks(recentTasks);
      setRecentTasks(sortedTasks);
    }
  }, [recentTasks, tasks]);

  const getActivityMessage = (task: Task) => {
    const prevTask = prevTasks.find(t => t.id === task.id);
    
    // Check if this is a new or updated task
    if (!prevTask) {
      const isNewest = recentTasks.indexOf(task) === 0;
      return isNewest ? `Task "${task.title}" was just updated` : `Task "${task.title}" was created`;
    }
    
    // Check for status change
    if (prevTask.status.id !== task.status.id) {
      return `Task "${task.title}" moved to ${task.status.name}`;
    }
    
    return `Task "${task.title}" was updated`;
  };

  const formatTime = (date: string) => {
    const now = new Date();
    const taskDate = new Date(date);
    const diffInMinutes = Math.floor((now.getTime() - taskDate.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return taskDate.toLocaleDateString();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
      <h2 className="flex items-center mb-6 text-xl font-semibold">
        <Clock className="w-5 h-5 mr-2" />
        Recent Activity
      </h2>
      <div className="space-y-4">
        <AnimatePresence initial={false} mode="popLayout">
          {recentTasks.map((task) => (
            <motion.div
              key={`${task.id}-${task.updatedAt}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="flex items-start p-4 space-x-4 transition-colors duration-200 rounded-lg bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <div className="flex-shrink-0">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  task.status.name.toLowerCase().includes('done') ? 'bg-green-500' :
                  task.status.name.toLowerCase().includes('progress') ? 'bg-yellow-500' :
                  'bg-blue-500'
                }`} />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{task.title}</h3>
                  <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                    {formatTime(task.updatedAt.toString())}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {getActivityMessage(task)}
                </p>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  <span className="flex items-center">
                    {task.status.name}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};