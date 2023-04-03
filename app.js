const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const connectDB = require('./config/db');
const app = express();

// Load config
dotenv.config({ path: './config/config.env' });

connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
