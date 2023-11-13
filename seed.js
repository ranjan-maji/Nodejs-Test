// seed.js
const db = require('./src/db');

db.serialize(() => {
  db.run('CREATE TABLE vehicles (id INTEGER PRIMARY KEY, type TEXT, name TEXT)');

  const vehicles = [
    { type: 'car', name: 'hatchback' },
    { type: 'car', name: 'suv' },
    { type: 'car', name: 'sedan' },
    { type: 'bike', name: 'cruiser' },
    { type: 'bike', name: 'sports' },
  ];

  const stmt = db.prepare('INSERT INTO vehicles (type, name) VALUES (?, ?)');
  vehicles.forEach((vehicle) => stmt.run(vehicle.type, vehicle.name));
  stmt.finalize();
});

console.log('Data seeded successfully.');



