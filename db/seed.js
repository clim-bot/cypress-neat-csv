const { sequelize } = require('./init');  // Correctly import sequelize instance
const { Community } = require('../models/community');  // Import the Community model

// Seed data for the Community model
const seedCommunities = [
  { name: 'Community A', description: 'Description A' },
  { name: 'Community B', description: 'Description B' },
  { name: 'Community C', description: 'Description C' },
  { name: 'Community D', description: 'Description D' },
  { name: 'Community E', description: 'Description E' },
  { name: 'Community F', description: 'Description F' },
  { name: 'Community G', description: 'Description G' },
  { name: 'Community H', description: 'Description H' },
  { name: 'Community I', description: 'Description I' },
  { name: 'Community J', description: 'Description J' },
];

async function seedDatabase() {
  try {
    // Force sync the database (drops and recreates tables)
    await sequelize.sync({ force: true });  // This syncs and forces table creation
    console.log('Database synced and cleared.');

    // Bulk insert the seed data into the Community table
    await Community.bulkCreate(seedCommunities);
    console.log('Seeded communities.');

    console.log('Database seeding completed.');
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
}

// Export the seedDatabase function
module.exports = { seedDatabase };
