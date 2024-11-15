// components/TaskBoard.tsx
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { TaskColumn } from './TaskColumn';
import { TaskModal } from './TaskModal';
import { TaskFilters } from './TaskFilters';
import { Task } from '../../types/task';
import { useTaskMetadataStore } from '../../store/TaskMetadataStore';

export const TaskBoard = () => {
  const { tasks, moveTask, fetchTasks } = useTaskStore();
  const { priorities, statuses, fetchMetadata } = useTaskMetadataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [search, setSearch] = useState('');
  const [priority, setPriority] = useState<string | 'All'>('All');
  const [status, setStatus] = useState<string | 'All'>('All');

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceId !== destinationId) {
      moveTask(taskId, destinationId);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
      task.description.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = priority === 'All' || task.priority.name === priority;
    const matchesStatus = status === 'All' || task.status.name === status;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetchTasks();
    fetchMetadata();
  }, [fetchTasks, fetchMetadata]);

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
        priorities={priorities}
        statuses={statuses}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statuses.map(({ id, name }) => (
            <TaskColumn
              key={id}
              id={id}
              title={name}
              tasks={filteredTasks.filter((task) => task.status.id === id)}
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
        priorities={priorities}
        statuses={statuses}
      />
    </>
  );
};
