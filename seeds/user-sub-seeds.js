const { UserSub } = require('../models');

const userSubData = [
  {
    user_id: 1,
    subscription_id: 1,
  },
  {
    user_id: 1,
    subscription_id: 2,
  },
  {
    user_id: 1,
    subscription_id: 3,
  },
  {
    user_id: 2,
    subscription_id: 5,
  },
  {
    user_id: 3,
    subscription_id: 1,
  },
  {
    user_id: 3,
    subscription_id: 3,
  },
  {
    user_id: 3,
    subscription_id: 4,
  },
  {
    user_id: 3,
    subscription_id: 5,
  },
  {
    user_id: 4,
    subscription_id: 1,
  },
  {
    user_id: 4,
    subscription_id: 2,
  },
  {
    user_id: 4,
    subscription_id: 6,
  },
  {
    user_id: 5,
    subscription_id: 3,
  },
];

const seedUserSubs = () => UserSub.bulkCreate(userSubData);

module.exports = seedUserSubs;
