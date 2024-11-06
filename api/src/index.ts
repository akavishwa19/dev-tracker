import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/taskRoutes';
import activityRoutes from './routes/activityRoutes';
import settingsRoutes from './routes/settingsRoutes';
import authRoutes from './routes/authRoutes';
import { seedData } from './seed';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

seedData()
.then(() => {
  console.log('Seeding completed.');
})
.catch((error) => {
  console.error('Error seeding data:', error);
});

// Routes
app.use('/api/tasks', taskRoutes);
app.use('/api/activities', activityRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/auth', authRoutes );

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
