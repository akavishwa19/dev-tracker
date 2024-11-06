import React from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Task } from '../../types/task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  id: string;
  title: string;
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ id, title, tasks }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      <h3 className="mb-4 text-lg font-medium">{title}</h3>
      <Droppable droppableId={id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-4"
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <TaskCard task={task} onClick={() => {}} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};