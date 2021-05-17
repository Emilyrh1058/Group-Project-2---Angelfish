const sequelize = require('../config/connection');
const { User, Subscription } = require('../models');

const userdata = [
  {
    email: 'email@email.com',
    password: 'password123'
  },
  {
    email: 'rmebes1@sogou.com',
    password: 'password123'
  },
  {
    email: 'cstoneman2@last.fm',
    password: 'password123'
  },
  {
    email: 'ihellier3@goo.ne.jp',
    password: 'password123'
  },
  {
    email: 'gmidgley4@weather.com',
    password: 'password123'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;