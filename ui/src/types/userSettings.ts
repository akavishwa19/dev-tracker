export interface UserSettings {
    id: string
    userId: string
    theme: 'dark' | 'light'
    emailNotifications: boolean
    taskReminders: boolean
  }