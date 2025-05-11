require('dotenv').config();
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/api', schoolRoutes);


sequelize.sync().then(() => {
  console.log('Database connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => {
  console.error('DB connection failed:', err);
});
