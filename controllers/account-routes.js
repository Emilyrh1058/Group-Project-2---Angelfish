const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Subscription, UserSub } = require('../models');
const withAuth = require('../utils/auth');

// get all subscriptions for account
router.get('/', withAuth, (req, res) => {
  User.findOne({
      attributes: { exclude: ['id', 'email', 'password'] },
      where: {
          id: req.session.user_id
      },
      include: [
          {
          model: Subscription,
          attributes: ['subscription_name']
          }
      ]
  })
  .then(dbAccountData => {
    if (!dbAccountData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
    //res.json(dbAccountData);
    let subscriptionsArray = [];

    for (i=0; i<dbAccountData.subscriptions.length; i++) {
        const subscription = dbAccountData.subscriptions[i].subscription_name;
        subscriptionsArray.push(subscription);
    } 
    console.log(subscriptionsArray);
    res.render('account', {
        subscriptionsArray,
        loggedIn: req.session.loggedIn
    });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });



module.exports = router;