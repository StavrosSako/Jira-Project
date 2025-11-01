import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', service: 'user-management' });
});

app.listen(config.port, () => {
  console.log(`User Management Service listening on port ${config.port}`);
});

