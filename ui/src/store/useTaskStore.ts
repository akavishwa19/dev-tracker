import { create } from 'zustand';
import { Task, TaskStatus } from '../types/task';

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          ...task,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    })),
  updateTask: (id, updates) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((task) => task.id !== id),
    })),
  moveTask: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      ),
    })),
}));