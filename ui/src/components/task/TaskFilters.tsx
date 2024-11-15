// components/TaskFilters.tsx
import { FC } from 'react';
import { TaskPriority, TaskStatus } from '../../types/task';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskFiltersProps {
  priorities: TaskPriority[];
  statuses: TaskStatus[];
}

export const TaskFilters: FC<TaskFiltersProps> = ({
  priorities,
  statuses,
}) => {
  const { filters, setFilters } = useTaskStore();

  return (
    <div className="mb-4 flex gap-2 items-center">
      {/* Search Filter */}
      <input
        type="text"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        placeholder="Search tasks..."
        className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600 flex-1"
      />

      {/* Priority Filter */}
      <select
        value={filters.priority}
        onChange={(e) => setFilters({ priority: e.target.value })}
        className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="All">All Priorities</option>
        {priorities.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>

      {/* Status Filter */}
      <select
        value={filters.status}
        onChange={(e) => setFilters({ status: e.target.value })}
        className="p-2 border rounded dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        <option value="All">All Statuses</option>
        {statuses.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
