import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Clock, Tag } from 'lucide-react';
import { Task } from '../../types/task';
import { cn } from '../../lib/utils';

interface ViewTaskDialogProps {
  task: Task;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ViewTaskDialog: React.FC<ViewTaskDialogProps> = ({
  task,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay 
          className="fixed inset-0 backdrop-blur-sm duration-200 bg-black/40 animate-in fade-in" 
        />
        <Dialog.Content 
          className="fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%] 
            rounded-lg border bg-white p-6 shadow-lg dark:border-gray-800 dark:bg-gray-900
            animate-in fade-in-0 zoom-in-95 slide-in-from-bottom duration-200"
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white">
              {task.title}
            </Dialog.Title>
            <Dialog.Close className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
              <X className="w-5 h-5" />
            </Dialog.Close>
          </div>

          {/* Content */}
          <div className="space-y-4">
            {/* Status and Priority */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-sm font-medium",
                  task.status.name === "Todo" && "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
                  task.status.name === "In Progress" && "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-200",
                  task.status.name === "Review" && "bg-teal-100 text-teal-700 dark:bg-teal-700 dark:text-teal-200",
                  task.status.name === "Done" && "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-200"
                )}>
                  {task.status.name}
                </span>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-sm font-medium",
                  task.priority.name === "Low" && "bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-200",
                  task.priority.name === "Medium" && "bg-yellow-100 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200",
                  task.priority.name === "High" && "bg-red-100 text-red-700 dark:bg-red-700 dark:text-red-200"
                )}>
                  {task.priority.name} Priority
                </span>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</h3>
                <p className="text-sm text-gray-600 whitespace-pre-wrap dark:text-gray-400">
                  {task.description}
                </p>
              </div>
            )}

            {/* Due Date */}
            {task.dueDate && (
              <div className="flex gap-2 items-center text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">
                  Due: {new Date(task.dueDate).toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              </div>
            )}

            {/* Tags */}
            {task.tags && task.tags.length > 0 && (
              <div className="space-y-2">
                <div className="flex gap-2 items-center text-gray-700 dark:text-gray-300">
                  <Tag className="w-4 h-4" />
                  <h3 className="text-sm font-medium">Tags</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full dark:text-gray-300 dark:bg-gray-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metadata */}
            <div className="pt-4 mt-4 space-y-2 text-xs text-gray-500 border-t border-gray-200 dark:border-gray-800 dark:text-gray-500">
              <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
              <p>Last Updated: {new Date(task.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
