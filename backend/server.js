const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Load Routes
const candidateRoutes = require('./routes/candidateRoutes');
const matchRoutes = require('./routes/matchRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Mount routes
app.use('/api/candidates', candidateRoutes); // Maps to /api/candidates
app.use('/api/match', matchRoutes);         // Maps to /api/match
app.use('/api/ai', aiRoutes);               // Maps to /api/ai/shortlist

app.get('/', (req, res) => {
  res.send('Candidate Shortlisting API is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
