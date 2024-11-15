import { create } from 'zustand';
import { TaskStatus } from '../types/task';
import { API_URL } from '../constants/app.constants';

interface StatusStore {
  statuses: TaskStatus[];
  fetchStatuses: () => void;
}

export const useStatusStore = create<StatusStore>((set) => ({
  statuses: [],

  fetchStatuses: async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      const res = await response.json();
      set({ statuses: res.data });
    } catch (error) {
      console.error('Failed to fetch statuses:', error);
    }
  },
}));