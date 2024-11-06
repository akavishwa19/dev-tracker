import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckSquare, Zap, Users, Lock } from 'lucide-react';

export const LandingPage = () => {
  const features = [
    {
      icon: CheckSquare,
      title: 'Task Management',
      description: 'Organize and track your development tasks with ease',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay synchronized with your team in real-time',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with your development team',
    },
    {
      icon: Lock,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="px-4 pt-20 pb-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="mb-6 text-5xl font-bold text-gray-900 dark:text-white">
            Developer Task Management,{' '}
            <span className="text-indigo-600 dark:text-indigo-400">
              Simplified
            </span>
          </h1>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-600 dark:text-gray-300">
            Track your development tasks, manage projects, and collaborate with
            your team - all in one place.
          </p>
          
          <Link
            to="/dashboard"
            className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
          >
            Get Started
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 mt-24 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 bg-white shadow-sm dark:bg-gray-800 rounded-xl"
            >
              <div className="absolute -top-4 left-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-md shadow-lg">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
            alt="Team collaboration"
            className="max-w-4xl mx-auto rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};