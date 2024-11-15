
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Tag } from 'lucide-react';
import type { Task } from '../../types/task';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const priorityColors = {
    Low: 'bg-blue-100 text-blue-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    High: 'bg-red-100 text-red-800',
  };

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-lg shadow-sm dark:shadow-zinc-400 dark:bg-gray-800"
    >
      <div className="flex items-start justify-between mb-2 cursor-grab">
        <h3 className="font-medium text-gray-900 dark:text-gray-100">
          {task.title}
        </h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            priorityColors[task.priority.name]
          }`}
        >
          {task.priority.name}
        </span>
      </div>
      
      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
        {task.description}
      </p>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>
            {task.dueDate
              ? new Date(task.dueDate).toLocaleDateString()
              : 'No due date'}
          </span>
        </div>
        
        {task.tags.length > 0 && (
          <div className="flex items-center space-x-1">
            <Tag className="w-4 h-4" />
            <span className="truncate max-w-[100px]">
              {task.tags.join(', ')}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};