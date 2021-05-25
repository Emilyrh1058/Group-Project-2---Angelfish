const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Subscription, UserSub } = require('../models');
const withAuth = require('../utils/auth');

// get all subscriptions for account
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Subscription.findAll({
    where: {
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'subscription_name'
    ],
    include: [
      {
        model: User,
        attributes: ['id', 'email'],
        include: {
          model: UserSub,
          attributes: ['id', 'user_id', 'subscription_id']
        }
      }
    ]
  })
    .then(dbPostData => {
      const subscriptions = dbPostData.map(post => post.get({ plain: true }));
      res.render('account', { subscriptions, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
  Subscription.findByPk(req.params.id, {
    attributes: [
        'id',
        'subscription_name'
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'email'],
          include: {
            model: UserSub,
            attributes: ['id', 'user_id', 'subscription_id']
          }
        }
      ]
  })
    .then(dbPostData => {
      if (dbPostData) {
        const subscriptions = dbPostData.get({ plain: true });
        
        res.render('edit-subscriptions', {
          subscriptions,
          loggedIn: true
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;