const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const aiRoutes = require('./routes/aiRoutes');
app.use('/api/ai', aiRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Global Express error handler — catches any error passed via next(err)
app.use((err, req, res, next) => {
  console.error('[Global Error Handler]', err.message || err);
  res.status(500).json({ error: 'Internal server error. Please try again later.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Prevent unhandled promise rejections from crashing the server
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Unhandled Rejection] at:', promise, 'reason:', reason?.message || reason);
});

// Prevent uncaught exceptions from crashing the server
process.on('uncaughtException', (err) => {
  console.error('[Uncaught Exception]', err.message || err);
});
