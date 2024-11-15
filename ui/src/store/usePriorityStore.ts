import { create } from 'zustand';
import { TaskPriority } from '../types/task';
import { API_URL } from '../constants/app.constants';

interface PriorityStore {
  priorities: TaskPriority[];
  fetchPriorities: () => void;
}

export const usePriorityStore = create<PriorityStore>((set) => ({
  priorities: [],

  fetchPriorities: async () => {
    try {
      const response = await fetch(`${API_URL}/priority`);
      const res = await response.json();
      set({ priorities: res.data });
    } catch (error) {
      console.error('Failed to fetch priorities:', error);
    }
  },
}));