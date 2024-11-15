import { create } from 'zustand';
import { Task } from '../types/task';
import { API_URL } from '../constants/app.constants';
import { getAuthToken } from '../utils/auth';

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
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks`, {
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        method: 'GET',
      });
      const res = await response.json();
      
      // Convert date strings to Date objects
      const tasksWithDates = res.data.map((task: Task) => ({
        ...task,
        updatedAt: new Date(task.updatedAt),
        createdAt: new Date(task.createdAt),
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined
      }));
      
      set({ tasks: tasksWithDates });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },

  addTask: async (task) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(task),
      });
      const { data: newTask } = await response.json();
      
      // Convert date strings to Date objects
      const taskWithDates = {
        ...newTask,
        updatedAt: new Date(newTask.updatedAt),
        createdAt: new Date(newTask.createdAt),
        dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined
      };
      
      set((state) => ({ tasks: [...state.tasks, taskWithDates] }));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (id, updates) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updates),
      });
      const { data: updatedTask } = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { 
            ...task, 
            ...updatedTask,
            updatedAt: new Date(updatedTask.updatedAt),
            createdAt: new Date(updatedTask.createdAt),
            dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : undefined
          } : task
        ),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },

  moveTask: async (taskId, newStatusId) => {
    // Optimistically update the task's status in the UI immediately
    set((state) => ({
      tasks: state.tasks.map((item) =>
        item.id === taskId 
          ? { 
              ...item, 
              status: { id: newStatusId, name: item.status.name },
              updatedAt: new Date()
            } 
          : item
      ),
    }));

    try {
      const token = getAuthToken();
      // Make the API call to update the task's status on the server
      const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statusId: newStatusId }),
      });

      const { data } = await response.json();

      // Update the state with the actual task data from the response
      set((state) => ({
        tasks: state.tasks.map((item) =>
          item.id === taskId 
            ? { 
                ...item, 
                ...data,
                updatedAt: new Date(data.updatedAt),
                createdAt: new Date(data.createdAt),
                dueDate: data.dueDate ? new Date(data.dueDate) : undefined
              } 
            : item
        ),
      }));
    } catch (error) {
      console.error('Failed to move task:', error);
      // Fetch fresh tasks from the server on error
      useTaskStore.getState().fetchTasks();
    }
  },

  deleteTask: async (id) => {
    try {
      const token = getAuthToken();
      await fetch(`${API_URL}/tasks/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  },
}));
