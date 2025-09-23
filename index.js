const express = require('express');
const cors = require('cors');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config(); // This line is crucial!

const app = express();

// Middleware
const corsOptions = {
  origin: 'https://job-frontend-ce4s.vercel.app'
};

app.use(cors(corsOptions)); // <-- This is the corrected line
app.use(express.json());

// Routes
app.use('/api', jobRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));