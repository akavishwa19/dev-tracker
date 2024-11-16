import { motion } from 'framer-motion';
import { Clock, Eye, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useTaskStore } from '../../store/useTaskStore';
import { ViewTaskDialog } from './ViewTaskDialog';
import { EditTaskDialog } from './EditTaskDialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../components/ui/AlertDialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

interface Task {
  id: string;
  title: string;
  description: string;
  status: { name: 'Todo' | 'In Progress' | 'Review' | 'Done' };
  priority: { name: 'Low' | 'Medium' | 'High' };
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const getPriorityColor = (priority: Task['priority']['name']) => {
  switch (priority) {
    case 'Low':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200';
    case 'High':
      return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200';
  }
};

const getStatusColor = (status: 'Todo' | 'In Progress' | 'Done' | 'Review') => {
  switch (status) {
    case 'Todo':
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    case 'In Progress':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200';
    case 'Review':
      return 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-200';
    case 'Done':
      return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200';
  }
};

export const TaskList = ({ filteredTasks }: { filteredTasks: Task[] }) => {
  const { deleteTask } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<Task | undefined>();
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!selectedTask) return;
    try {
      setIsDeleting(true);
      await deleteTask(selectedTask.id);
      setShowDeleteAlert(false);
    } catch (error) {
      console.error('Failed to delete task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Task
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Priority
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Due Date
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-gray-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredTasks.map((task) => (
              <motion.tr
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {task.title}
                  </div>
                  {task.description && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[300px] cursor-pointer">
                          {task.description}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-sm whitespace-normal">
                          {task.description}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      task.status.name
                    )}`}
                  >
                    {task.status.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority.name
                    )}`}
                  >
                    {task.priority.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    {task.dueDate ? (
                      <>
                        <Clock className="mr-1 w-4 h-4" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </>
                    ) : (
                      <span className="text-gray-400">No due date</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsViewOpen(true);
                      }}
                      className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setIsEditOpen(true);
                      }}
                      className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedTask(task);
                        setShowDeleteAlert(true);
                      }}
                      className="p-1 text-gray-500 rounded-full hover:bg-gray-100 hover:text-red-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* View Task Dialog */}
        {selectedTask && (
          <ViewTaskDialog
            task={selectedTask}
            open={isViewOpen}
            onOpenChange={setIsViewOpen}
          />
        )}

        {/* Edit Task Dialog */}
        {selectedTask && (
          <EditTaskDialog
            task={selectedTask}
            open={isEditOpen}
            onOpenChange={setIsEditOpen}
          />
        )}

        {/* Delete Task Dialog */}
        <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Delete Task
              </AlertDialogTitle>
              <AlertDialogDescription className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Are you sure you want to delete "{selectedTask?.title}"? This action cannot be undone
                and will permanently remove the task from your dashboard.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 space-x-2">
              <AlertDialogCancel
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border dark:text-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                disabled={isDeleting}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? (
                  <div className="flex items-center">
                    <svg className="mr-2 w-4 h-4 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Deleting...
                  </div>
                ) : (
                  'Delete Task'
                )}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </TooltipProvider>
  );
};
