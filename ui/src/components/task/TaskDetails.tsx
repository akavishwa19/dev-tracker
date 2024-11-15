import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MessageSquare, Clock, Tag, AlertCircle } from 'lucide-react';
import { Task } from '../../types/task';

interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

interface Activity {
  id: string;
  type: 'status_change' | 'priority_change' | 'comment' | 'created' | 'updated';
  description: string;
  timestamp: Date;
}

interface TaskDetailsProps {
  task: Task;
  onClose: () => void;
}

export const TaskDetails: React.FC<TaskDetailsProps> = ({ task, onClose }) => {
  const [newComment, setNewComment] = useState('');

  // Mock data - replace with backend data in real app
  const comments: Comment[] = [
    {
      id: '1',
      text: "Let's break this down into smaller subtasks",
      author: 'Jane Smith',
      createdAt: new Date('2024-03-01T10:00:00'),
    },
    {
      id: '2',
      text: "I've started working on the first part",
      author: 'John Doe',
      createdAt: new Date('2024-03-02T15:30:00'),
    },
  ];

  const activities: Activity[] = [
    {
      id: '1',
      type: 'created',
      description: 'Task created',
      timestamp: task.createdAt,
    },
    {
      id: '2',
      type: 'status_change',
      description: 'Status changed to In Progress',
      timestamp: new Date('2024-03-01T09:00:00'),
    },
    {
      id: '3',
      type: 'priority_change',
      description: 'Priority changed to High',
      timestamp: new Date('2024-03-02T11:00:00'),
    },
  ];

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    // Send comment to backend in real app
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-25">
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-3xl bg-white rounded-lg shadow-xl dark:bg-gray-800"
        >
          <div className="flex items-start justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-2xl font-bold">{task.title}</h2>
              <div className="flex items-center mt-2 space-x-4">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  task.priority.name === 'High' ? 'bg-red-100 text-red-800' :
                  task.priority.name === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {task.priority.name}
                </span>
                <span className="text-sm text-gray-500">
                  Created {format(task.createdAt, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div className="grid grid-cols-3 gap-6 p-6">
            <div className="col-span-2 space-y-6">
              <div>
                <h3 className="mb-2 text-lg font-medium">Description</h3>
                <p className="text-gray-600 dark:text-gray-300">{task.description}</p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Comments</h3>
                <form onSubmit={handleSubmitComment} className="mb-4">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    rows={3}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                      Add Comment
                    </button>
                  </div>
                </form>

                <div className="space-y-4">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-gray-500">
                          {format(comment.createdAt, 'MMM d, h:mm a')}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-600 dark:text-gray-300">
                        {comment.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="mb-4 text-lg font-medium">Details</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Due: {task.dueDate ? format(task.dueDate, 'MMM d, yyyy') : 'No due date'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-gray-400" />
                    <span>Status: {task.status.name}</span>
                  </div>
                  {task.tags.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Tag className="w-5 h-5 text-gray-400" />
                      <div className="flex flex-wrap gap-2">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium bg-gray-100 rounded-full dark:bg-gray-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-medium">Activity</h3>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-3"
                    >
                      <MessageSquare className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-sm">{activity.description}</p>
                        <span className="text-xs text-gray-500">
                          {format(activity.timestamp, 'MMM d, h:mm a')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
