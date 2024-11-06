import { useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { TaskColumn } from './TaskColumn';
import { TaskModal } from './TaskModal';
import { TaskFilters } from './TaskFilters';
import { Task, TaskStatus, TaskPriority } from '../../types/task';

const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' },
];

export const TaskBoard = () => {
  const { tasks, moveTask } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<TaskPriority | 'all'>('all');
  const [status, setStatus] = useState<TaskStatus | 'all'>('all');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId as TaskStatus;
    const destinationId = result.destination.droppableId as TaskStatus;
    const taskId = result.draggableId;

    if (sourceId !== destinationId) {
      moveTask(taskId, destinationId);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priority === 'all' || task.priority === priority;
    const matchesStatus = status === 'all' || task.status === status;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <button
          onClick={() => {
            setSelectedTask(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add Task
        </button>
      </div>

      <TaskFilters
        search={search}
        setSearch={setSearch}
        priority={priority}
        setPriority={setPriority}
        status={status}
        setStatus={setStatus}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {columns.map(({ id, title }) => (
            <TaskColumn
              key={id}
              id={id}
              title={title}
              tasks={filteredTasks.filter((task) => task.status === id)}
              onTaskClick={handleTaskClick}
            />
          ))}
        </div>
      </DragDropContext>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(undefined);
        }}
        task={selectedTask}
      />
    </>
  );
};
