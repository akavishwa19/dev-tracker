import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Moon, Bell, User, Pencil, Check, Shield, ChevronRight } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../contexts/AuthContext';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { API_URL } from '../constants/app.constants';
import { toast } from 'react-toastify';
import { UserSettings } from '../types/userSettings';
import React from 'react';

const MotionButton = motion.button;
const MotionInput = motion(motion.input);

export const SettingsPage = React.memo(() => {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
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
    if (!isEditing)
      return setIsEditing(true);

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
      toast.error("Failed to update profile");
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
      description: 'Customize your app appearance',
      content: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="space-y-1">
              <span className="font-medium">Dark Mode</span>
              <p className="text-sm text-gray-500 dark:text-gray-400">Switch between light and dark themes</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={theme === 'dark'}
                onChange={toggleTheme}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                          peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full 
                          peer dark:bg-gray-600 peer-checked:after:translate-x-full 
                          peer-checked:after:border-white after:content-[''] after:absolute 
                          after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                          after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                          dark:border-gray-600 peer-checked:bg-indigo-600">
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: theme === 'dark' ? 1 : 0 }}
                >
                  {/* <Moon className="w-3 h-3 ml-6 text-white" /> */}
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center justify-center"
                  initial={false}
                  animate={{ opacity: theme === 'dark' ? 0 : 1 }}
                >
                  {/* <Sun className="w-3 h-3 ml-1 text-gray-500" /> */}
                </motion.span>
              </div>
            </label>
          </div>
        </div>
      ),
    },
    {
      title: 'Notifications',
      icon: Bell,
      description: 'Manage your notification preferences',
      content: (
        <div className="space-y-4">
          <div className="p-3 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-medium">Email Notifications</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.emailNotifications || false}
                  onChange={(e) => handleNotificationChange(e, 'emailNotifications')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full 
                            peer dark:bg-gray-600 peer-checked:after:translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute 
                            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-medium">Task Reminders</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Get notified about upcoming tasks</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationSettings?.taskReminders || false}
                  onChange={(e) => handleNotificationChange(e, 'taskReminders')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 
                            peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full 
                            peer dark:bg-gray-600 peer-checked:after:translate-x-full 
                            peer-checked:after:border-white after:content-[''] after:absolute 
                            after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 
                            after:border after:rounded-full after:h-5 after:w-5 after:transition-all 
                            dark:border-gray-600 peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Profile',
      icon: User,
      description: 'Manage your personal information',
      content: (
        <form onSubmit={handleProfileSubmit} className="space-y-4">
          <div className="p-3 space-y-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div>
              <label className="block mb-1 text-sm font-medium">Display Name</label>
              <MotionInput
                name="name"
                type="text"
                className={`w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:border-indigo-500 
                         focus:ring-indigo-500 dark:bg-gray-600 dark:border-gray-500 
                         ${isEditing ? 'dark:text-white' : 'dark:text-gray-400'}`}
                value={profileForm.name}
                disabled={!isEditing}
                onChange={handleInputChange}
                animate={{ scale: isEditing ? 1 : 0.98 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                type="email"
                value={user?.email}
                disabled
                className="w-full p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm dark:bg-gray-600 dark:border-gray-500 dark:text-gray-400"
              />
            </div>
          </div>
          <AnimatePresence>
            {isEditing && (
              <MotionButton
                type="submit"
                className="w-full py-2 text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Save Changes
              </MotionButton>
            )}
          </AnimatePresence>
        </form>
      ),
    },
    {
      title: 'Security',
      icon: Shield,
      description: 'Manage your account security',
      content: (
        <div className="space-y-4">
          <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="font-medium">Change Password</span>
                <p className="text-sm text-gray-500 dark:text-gray-400">Update your account password</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      ),
    },
  ], [
    toggleTheme,
    theme,
    notificationSettings?.emailNotifications,
    notificationSettings?.taskReminders,
    handleProfileSubmit,
    profileForm.name,
    isEditing,
    handleInputChange,
    user?.email,
    handleNotificationChange,
  ]);

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center mb-8 space-x-3"
      >
        <Settings className="w-8 h-8 text-indigo-600" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your account preferences</p>
        </div>
      </motion.div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="overflow-hidden transition-shadow bg-white shadow-sm rounded-xl dark:bg-gray-800 hover:shadow-md"
            onHoverStart={() => setActiveSection(section.title)}
            onHoverEnd={() => setActiveSection(null)}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <motion.div
                    animate={{
                      scale: activeSection === section.title ? 1.1 : 1,
                      rotate: activeSection === section.title ? 5 : 0,
                    }}
                    className="p-2 bg-indigo-100 rounded-lg dark:bg-indigo-900"
                  >
                    <section.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </motion.div>
                  <div>
                    <h2 className="text-lg font-medium">{section.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{section.description}</p>
                  </div>
                </div>
                {section.title === 'Profile' && (
                  <MotionButton
                    onClick={() => setIsEditing((prev) => !prev)}
                    className="p-2 text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isEditing ? <Check className="w-5 h-5" /> : <Pencil className="w-5 h-5" />}
                  </MotionButton>
                )}
              </div>
              <motion.div
                initial={false}
                animate={{ height: 'auto' }}
                className="relative"
              >
                {section.content}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
