// components/TaskBoard.tsx
import { useEffect, useState } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Plus } from 'lucide-react';
import { useTaskStore } from '../../store/useTaskStore';
import { TaskColumn } from './TaskColumn';
import { TaskModal } from './TaskModal';
import { Task } from '../../types/task';
import { useTaskMetadataStore } from '../../store/TaskMetadataStore';

export const TaskBoard = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const { moveTask, fetchTasks } = useTaskStore();
  const { priorities, statuses, fetchMetadata } = useTaskMetadataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceId = result.source.droppableId;
    const destinationId = result.destination.droppableId;
    const taskId = result.draggableId;

    if (sourceId !== destinationId) {
      moveTask(taskId, destinationId);
    }
  };

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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Task Board</h2>
        <button
          onClick={() => {
            setSelectedTask(undefined);
            setIsModalOpen(true);
          }}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md border border-transparent shadow-sm hover:bg-indigo-700"
        >
          <Plus className="mr-2 w-5 h-5" />
          Add Task
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {statuses.map(({ id, name }) => (
            <TaskColumn
              key={id}
              id={id as string}
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
