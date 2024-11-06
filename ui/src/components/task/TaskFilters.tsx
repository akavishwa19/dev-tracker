import React from 'react';
import { Search, Filter } from 'lucide-react';
import { TaskPriority, TaskStatus } from '../../types/task';

interface TaskFiltersProps {
  search: string;
  setSearch: (search: string) => void;
  priority: TaskPriority | 'all';
  setPriority: (priority: TaskPriority | 'all') => void;
  status: TaskStatus | 'all';
  setStatus: (status: TaskStatus | 'all') => void;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
}) => {
  return (
    <div className="p-4 mb-6 space-y-4 bg-white rounded-lg dark:bg-gray-800">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-5 p-5 pl-10 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as TaskPriority | 'all')}
            className="p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus | 'all')}
            className="p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="all">All Statuses</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="review">Review</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </div>
  );
};