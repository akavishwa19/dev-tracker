import { motion } from 'framer-motion';
import { TaskBoard } from '../components/task/TaskBoard';
import { TaskStats } from '../components/dashboard/TaskStats';
import { RecentActivity } from '../components/dashboard/RecentActivity';

export const DashboardPage = () => {
  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="grid grid-cols-1 gap-8 lg:grid-cols-3"
      >
        <TaskStats />
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
      </motion.div>
      <div className="mt-8">
        <TaskBoard />
      </div>
    </div>
  );
};