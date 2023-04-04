const express = require('express');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 3000;
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const app = express();

// Load config
dotenv.config({ path: './config/config.env' });

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Routes
app.use('/', require('./routes/index'));

connectDB();

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
