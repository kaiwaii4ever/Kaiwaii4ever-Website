const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const authenticateToken = require('./services/authenticateToken');

const playerRoutes = require('./routes/player');
const dataDumpRoutes = require('./routes/dataDump');
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const banCheckRoutes = require('./routes/banCheck');
const minecraftRoutes = require('./routes/minecraftstop');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
}

const app = express();

app.use(express.json());
app.use(logger);
app.use(cors({ origin: 'https://kaiwaii4ever.win' }));

app.get('/', (req, res) => res.send('Backend is running'));

app.use('/api/player', playerRoutes);
app.use('/api/minecraft/pyksmp', minecraftRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/user/player-data', dataDumpRoutes);
app.use('/api/user', authenticateToken, userRoutes);
app.use('/api/user/ban', authenticateToken, banCheckRoutes);
app.use('/api/user/dashboard', authenticateToken, dashboardRoutes);

const MONGO_URI2 = process.env.MONGO_URI2;
const API_PORT = process.env.API_PORT || 3000;

mongoose.connect(MONGO_URI2, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(API_PORT, () => console.log(`Server running on port ${API_PORT}`));
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

process.on('SIGINT', async () => {
  console.log('Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});