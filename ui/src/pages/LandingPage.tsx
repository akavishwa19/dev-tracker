import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CheckSquare, Zap, Users, Lock, ArrowRight, Github } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="flex flex-col items-center pt-20 pb-16 text-center lg:pt-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-3xl"
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              Developer Task Management,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500 dark:from-indigo-400 dark:to-purple-400">
                Simplified
              </span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Track your development tasks, manage projects, and collaborate with
              your team - all in one place. Built by developers, for developers.
            </p>
            <div className="flex flex-col gap-4 justify-center items-center mt-10 sm:flex-row">
              <Link
                to="/dashboard"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-lg transition-all hover:bg-indigo-500 hover:shadow-xl group"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <a
                href="https://github.com/yshashi/dev-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 text-base font-medium text-gray-700 bg-white rounded-lg shadow-lg transition-all dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:shadow-xl"
              >
                <Github className="mr-2 w-4 h-4" />
                View on GitHub
              </a>
            </div>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-24">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 bg-white rounded-2xl shadow-lg transition-all dark:bg-gray-800 hover:shadow-xl"
              >
                <div className="absolute top-0 left-8 -translate-y-1/2">
                  <div className="inline-flex justify-center items-center w-12 h-12 text-white bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-lg">
                    <feature.icon className="w-6 h-6" />
                  </div>
                </div>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Screenshot Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="pb-24 text-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900" />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80"
              alt="Team collaboration"
              className="object-cover w-full rounded-2xl shadow-2xl aspect-video"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};