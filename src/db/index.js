// db/index.js
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:'); // Use an actual database for a production environment

db.serialize(() => {
  // Create vehicles table
  db.run(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      name TEXT
    )
  `);

  // Create bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vehicleType TEXT,
      startTime DATETIME,
      endTime DATETIME
    )
  `);

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      numberOfWheels INTEGER,
      vehicleType TEXT,
      vehicleModel TEXT
    )
  `);

  // Seed data
  const vehiclesData = [
    { type: 'car', name: 'hatchback' },
    { type: 'car', name: 'suv' },
    { type: 'car', name: 'sedan' },
    { type: 'bike', name: 'cruiser' },
    { type: 'bike', name: 'sports' },
  ];

  const stmtVehicles = db.prepare('INSERT INTO vehicles (type, name) VALUES (?, ?)');
  vehiclesData.forEach((vehicle) => stmtVehicles.run(vehicle.type, vehicle.name));
  stmtVehicles.finalize();
});

module.exports = db;
