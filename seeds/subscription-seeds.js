const { Subscription } = require('../models');

const subscriptionData = [
  {
    subscription_name: 'Fundraising Opportunity',
  },
  {
    subscription_name: 'Donation Request',
  },
  {
    subscription_name: 'Volunteer Opportunity',
  },
  {
    subscription_name: 'Coral Reefs',
  },
  {
    subscription_name: 'Marine Mammals',
  },
  {
    subscription_name: 'Fish Facts',
  }
];

const seedSubscriptions = () => Subscription.bulkCreate(subscriptionData);

module.exports = seedSubscriptions;
