/* eslint-disable @typescript-eslint/no-unused-vars */
// components/TaskFilters.tsx
import { FC } from 'react';
import { TaskPriority, TaskStatus } from '../../types/task';

interface TaskFiltersProps {
  search: string;
  setSearch: (value: string) => void;
  priority: string;
  setPriority: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
  priorities:TaskPriority[];
  statuses: TaskStatus[];
}

export const TaskFilters: FC<TaskFiltersProps> = ({
  search,
  setSearch,
  priority,
  setPriority,
  status,
  setStatus,
  priorities,
  statuses,
}) => (
  <div className="mb-4">
    {/* Search Filter */}
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks..."
      className="w-full p-2 border rounded dark:text-gray-700"
    />

    {/* Priority Filter */}
    {/* <select
      value={priority}
      onChange={(e) => setPriority(e.target.value as string)}
      className="w-full p-2 border rounded md:w-1/4 dark:text-gray-700"
    >
      <option value="All">All Priorities</option>
      {priorities.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select> */}

    {/* Status Filter */}
    {/* <select
      value={status}
      onChange={(e) => setStatus(e.target.value as string)}
      className="p-2 ml-2 border rounded dark:text-gray-700"
    >
      <option value="All">All Statuses</option>
      {statuses.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select> */}
  </div>
);
