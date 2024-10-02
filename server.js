const express = require('express');
const { initDB } = require('./db/init');
const { seedDatabase } = require('./db/seed');
const routes = require('./routes/routes');

const app = express();

// Middleware to parse JSON data
app.use(express.json());

// Use the routes
app.use('/api', routes);

// Define the port
const PORT = process.env.PORT || 3000;

// Initialize the server
(async () => {
  try {
    // Initialize the database
    await initDB();
    
    // Seed the database
    await seedDatabase();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to initialize the server:', error);
  }
})();
