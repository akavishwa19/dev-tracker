import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../store/useTaskStore';
import { TaskCard } from '../components/task/TaskCard';
import { TaskModal } from '../components/task/TaskModal';
import { Task } from '../types/task';

export const TasksPage = () => {
  const { tasks } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTask = () => {
    setIsModalOpen(true);
  };

  // TODO: Add task to store
  const handleTaskClick = (task: Task) => {
    setIsModalOpen(true);
  };

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Tasks</h2>
        <button
          onClick={handleAddTask}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onClick={handleTaskClick}
          />
        ))}
      </div>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};