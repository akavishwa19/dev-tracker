import { create } from 'zustand';
import { Task } from '../types/task';
import { API_URL, JWT_TOKEN } from '../constants/app.constants';

interface TaskStore {
  tasks: Task[];
  fetchTasks: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'priority' | 'status'>) => Promise<void>;
  updateTask: (id: string, updates: Partial<Task>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (taskId: string, newStatusId: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  fetchTasks: async () => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JWT_TOKEN}` },
        method: 'GET',
      });
      const res = await response.json();
      set({ tasks: res.data });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },

  addTask: async (task) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${JWT_TOKEN}` },
        body: JSON.stringify(task),
      });
      const newTask = await response.json();
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const response = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      const updatedTask = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedTask } : task
        ),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },

  deleteTask: async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  },

  moveTask: async (taskId, newStatusId) => {
    // Store the original status to revert if API call fails
    const originalTasks = useTaskStore.getState().tasks;

    // Optimistically update the task's status in the UI immediately
    set((state) => ({
      tasks: state.tasks.map((item) =>
      {
        if (item.id === taskId) {
          return { ...item, status: { id: newStatusId, name: item.status.name } };
        }
        return item;
      }
      ),
    }));

    try {
      // Make the API call to update the task's status on the server
      const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JWT_TOKEN}`,
        },
        body: JSON.stringify({ statusId: newStatusId }),
      });

      const { data } = await response.json();
      const { task } = data;

      // Update the state with the actual task data from the response
      set((state) => ({
        tasks: state.tasks.map((item) =>
          item.id === taskId ? { ...item, ...task } : item
        ),
      }));
    } catch (error) {
      console.error('Failed to move task:', error);

      // Revert the tasks to their original state if the API call fails
      set({ tasks: originalTasks });
    }
  },
}));
