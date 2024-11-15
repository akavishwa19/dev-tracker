import { create } from 'zustand';
import { Task } from '../types/task';
import { API_URL } from '../constants/app.constants';
import { getAuthToken } from '../utils/auth';

interface TaskStore {
  tasks: Task[];
  filteredTasks: Task[];
  filters: {
    search: string;
    priority: string;
    status: string;
  };
  setTasks: (tasks: Task[]) => void;
  setFilters: (filters: Partial<TaskStore['filters']>) => void;
  fetchTasks: () => void;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'priority' | 'status'>) => Promise<void>;
  updateTask: (taskId: string, updates: Partial<Task>) => Promise<void>;
  updateTaskStatus: (taskId: string, statusId: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  moveTask: (taskId: string, newStatusId: string) => Promise<void>;
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filteredTasks: [],
  filters: {
    search: '',
    priority: 'All',
    status: 'All',
  },

  setTasks: (tasks) => {
    set({ tasks });
    // Apply current filters to the new tasks
    const store = get();
    const filtered = store.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                          task.description.toLowerCase().includes(store.filters.search.toLowerCase());
      const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
      const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
    set({ filteredTasks: filtered });
  },

  setFilters: (newFilters) => {
    const store = get();
    const updatedFilters = { ...store.filters, ...newFilters };
    set({ filters: updatedFilters });
    
    // Apply updated filters to tasks
    const filtered = store.tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(updatedFilters.search.toLowerCase()) ||
                          task.description.toLowerCase().includes(updatedFilters.search.toLowerCase());
      const matchesPriority = updatedFilters.priority === 'All' || task.priority.id === updatedFilters.priority;
      const matchesStatus = updatedFilters.status === 'All' || task.status.id === updatedFilters.status;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
    set({ filteredTasks: filtered });
  },

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
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
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
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  },

  updateTask: async (taskId, updates) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
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
          task.id === taskId ? { 
            ...task, 
            ...updatedTask,
            updatedAt: new Date(updatedTask.updatedAt),
            createdAt: new Date(updatedTask.createdAt),
            dueDate: updatedTask.dueDate ? new Date(updatedTask.dueDate) : undefined
          } : task
        ),
      }));
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  },

  updateTaskStatus: async (taskId, statusId) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ statusId }),
      });
      const { data } = await response.json();
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { 
            ...task, 
            ...data,
            updatedAt: new Date(data.updatedAt),
            createdAt: new Date(data.createdAt),
            dueDate: data.dueDate ? new Date(data.dueDate) : undefined
          } : task
        ),
      }));
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
    } catch (error) {
      console.error('Failed to update task status:', error);
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
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
    } catch (error) {
      console.error('Failed to move task:', error);
      // Fetch fresh tasks from the server on error
      useTaskStore.getState().fetchTasks();
    }
  },

  deleteTask: async (id) => {
    try {
      const token = getAuthToken();
      const response = await fetch(`${API_URL}/tasks/${id}`, { 
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task: ${response.statusText}`);
      }

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
      // Apply current filters to the new tasks
      const store = get();
      const filtered = store.tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(store.filters.search.toLowerCase()) ||
                            task.description.toLowerCase().includes(store.filters.search.toLowerCase());
        const matchesPriority = store.filters.priority === 'All' || task.priority.id === store.filters.priority;
        const matchesStatus = store.filters.status === 'All' || task.status.id === store.filters.status;
        
        return matchesSearch && matchesPriority && matchesStatus;
      });
      set({ filteredTasks: filtered });
    } catch (error) {
      console.error('Failed to delete task:', error);
      // Re-fetch tasks to ensure consistency
      useTaskStore.getState().fetchTasks();
      throw error; // Re-throw to handle in the component
    }
  },
}));
