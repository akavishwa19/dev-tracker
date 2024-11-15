// store/useTaskMetadataStore.ts
import { create } from 'zustand';
import { TaskPriority, TaskStatus } from '../types/task';
import { API_URL } from '../constants/app.constants';

interface TaskMetadataStore {
  priorities: TaskPriority[];
  statuses: TaskStatus[];
  fetchMetadata: () => void;
}

export const useTaskMetadataStore = create<TaskMetadataStore>((set) => ({
  priorities: [],
  statuses: [],
  fetchMetadata: async () => {
    try {
      const [priorityResponse, statusResponse] = await Promise.all([
        fetch(`${API_URL}/priority`),
        fetch(`${API_URL}/status`),
      ]);
      const [priorityData, statusData] = await Promise.all([
        priorityResponse.json(),
        statusResponse.json(),
      ]);
      set({ priorities: priorityData.data, statuses: statusData.data });
    } catch (error) {
      console.error('Failed to fetch task metadata:', error);
    }
  },
}));
