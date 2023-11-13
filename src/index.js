// src/index.js
const express = require('express');
const db = require('./db');
const vehiclesRouter = require('./routes/vehicles');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', vehiclesRouter);

db.serialize(() => {
  // Create tables and seed data here
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
