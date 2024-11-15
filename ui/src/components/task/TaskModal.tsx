import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Tag } from 'lucide-react';
import { Task, TaskPriority, TaskStatus } from '../../types/task';
import { useTaskStore } from '../../store/useTaskStore';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task?: Task;
  priorities: TaskPriority[];
  statuses: TaskStatus[];
}

export const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, task, priorities, statuses }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priorityId: '',
    statusId: '',
    dueDate: '',
    tags: [] as string[],
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priorityId: task.priority.id,
        statusId: task.status.id,
        dueDate: task.dueDate?.toString() as string,
        tags: task.tags,
      });
    }
  }, [task, priorities, statuses]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.title?.trim()) {
      return;
    }

    const taskData = {
      ...formData,
      priorityId: formData.priorityId || priorities[0].id,
      statusId: formData.statusId || statuses[0].id,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    };

    if (task) {
      updateTask(task.id, taskData);
    } else {
      addTask(taskData);
    }
    onClose();
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (newTag && !formData.tags.includes(newTag)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, newTag],
        }));
      }
      e.currentTarget.value = '';
    }
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id } = priorities.find(({ id }) => id === e.target.value) as TaskPriority;
    setFormData((prev) => ({ ...prev, priorityId: id }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { id } = statuses.find(({ id }) => id === e.target.value) as TaskStatus;
    setFormData((prev) => ({ ...prev, statusId: id }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose} // Closes modal on click
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md p-6 bg-white rounded-lg shadow-xl dark:bg-gray-800"
            >
              <button
                onClick={onClose}
                className="absolute text-gray-400 top-4 right-4 hover:text-gray-500"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="mb-6 text-2xl font-semibold">
                {task ? 'Edit Task' : 'Create New Task'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-1 text-sm font-medium">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm font-medium">Priority</label>
                    <select value={formData.priorityId} onChange={handlePriorityChange} className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
                      {priorities.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1 text-sm font-medium">Status</label>
                    <select value={formData.statusId} onChange={handleStatusChange} className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500">
                      {statuses.map(({ id, name }) => (
                        <option key={id} value={id}>
                          {name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Due Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.dueDate}
                      onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                      className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {/* <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" /> */}
                  </div>
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            tags: prev.tags.filter((_, i) => i !== index)
                          }))}
                          className="ml-1 text-indigo-600 hover:text-indigo-500"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      onKeyDown={handleTagInput}
                      placeholder="Type and press Enter to add tags"
                      className="w-full p-1 border-gray-300 rounded-md shadow-sm dark:text-gray-700 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <Tag className="absolute w-5 h-5 text-gray-400 right-3 top-2" />
                  </div>
                </div>

                <div className="flex justify-end pt-4 space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    {task ? 'Update Task' : 'Create Task'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
