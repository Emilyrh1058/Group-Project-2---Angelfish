const seedUsers = require('./user-seeds');
const seedSubscriptions = require('./post-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');

  await seedSubscriptions();
  console.log('--------------');

  process.exit(0);
};

seedAll();