import { motion } from 'framer-motion';
import { Settings, Moon, Bell, User, Pencil, Check } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { API_URL } from '../constants/app.constants';
import { toast } from 'react-toastify';
import { UserSettings } from '../types/userSettings';
import React from 'react';

export const SettingsPage = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({ name: user?.name || '' });
  const [notificationSettings, setNotificationSettings] = useState<UserSettings | null>(null);

  const token = localStorage.getItem('authToken');

  const fetchUserSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/settings/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotificationSettings(data?.data);
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchUserSettings();
  }, [fetchUserSettings]);

  const handleProfileSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return setIsEditing(true);

    try {
      const response = await fetch(`${API_URL}/settings/user/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileForm),
      });

      if (response.ok) {
        toast.success("Display name updated");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }, [isEditing, profileForm, token]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateNotificationSettings = useCallback(async (settings: UserSettings, type: string) => {
    const messageType = type === 'emailNotifications' ? 'Email' : 'Task reminder';
    try {
      const response = await fetch(`${API_URL}/settings/user/notification`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        toast.error(`${messageType} notification setting update failed`);
        return false;
      }

      toast.success(`${messageType} notification setting updated successfully`);
      return true;
    } catch (error) {
      toast.error(`${messageType} notification setting update failed`);
      console.error('Error updating notifications:', error);
      return false;
    }
  }, [token]);

  const handleNotificationChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>, type: 'emailNotifications' | 'taskReminders') => {
      const updatedSettings = { ...notificationSettings, [type]: e.target.checked } as UserSettings;
      setNotificationSettings(updatedSettings);

      const success = await updateNotificationSettings(updatedSettings, type);
      if (!success) {
        const fallbackSettings = { ...notificationSettings, [type]: !e.target.checked } as UserSettings;
        setNotificationSettings(fallbackSettings);
      }
    },
    [notificationSettings, updateNotificationSettings]
  );


  const sections = useMemo(() => [
    {
      title: 'Theme',
      icon: Moon,
      content: (
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full ${theme === 'dark' ? 'bg-indigo-600' : 'bg-gray-200'}`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}`}
            />
          </button>
        </div>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <input checked={notificationSettings?.emailNotifications || false} type="checkbox" className="text-indigo-600 rounded" onChange={(e) => handleNotificationChange(e, 'emailNotifications')} />
          </div>
          <div className="flex items-center justify-between">
            <span>Task Reminders</span>
            <input checked={notificationSettings?.taskReminders || false} type="checkbox" className="text-indigo-600 rounded" onChange={(e) => handleNotificationChange(e, 'taskReminders')} />
          </div>
        </div>
      ),
    },
    {
      title: 'Profile',
      icon: User,
      content: (
        <form onSubmit={handleProfileSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium">Display Name</label>
            <input
              name="name"
              type="text"
              className={`w-full p-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${isEditing ? 'dark:text-gray-700' : ''}`}
              value={profileForm.name}
              disabled={!isEditing}
              onChange={handleInputChange}
            />
          </div>
          <div className="mt-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <input
              type="email"
              value={user?.email}
              disabled
              className="w-full p-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          {isEditing && (
            <button type="submit" className="w-full py-2 mt-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-500">
              Save Changes
            </button>
          )}
        </form>
      ),
    },
  ], [toggleTheme, theme, notificationSettings?.emailNotifications, notificationSettings?.taskReminders, handleProfileSubmit, profileForm.name, isEditing, handleInputChange, user?.email, handleNotificationChange]);

  return (
    <div className="max-w-2xl px-4 py-8 mx-auto">
      <div className="flex items-center mb-8 space-x-2">
        <Settings className="w-6 h-6 text-indigo-600" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <section.icon className="w-5 h-5 text-indigo-600" />
                <h2 className="text-lg font-medium">{section.title}</h2>
              </div>
              {section.title === 'Profile' && (
                <button
                  onClick={() => setIsEditing((prev) => !prev)}
                  className="p-1 text-indigo-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {isEditing ? <Check className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                </button>
              )}
            </div>
            {section.content}
          </motion.div>
        ))}
      </div>
    </div>
  );
});
