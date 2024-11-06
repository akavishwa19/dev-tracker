export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = 'todo' | 'in-progress' | 'review' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee?: string;
  dueDate?: Date;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}