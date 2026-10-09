import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
})

app.use('/auth', authRoutes);
app.use('/projects', projectRoutes);
app.use('/projects/:projectId/tasks', taskRoutes);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app
