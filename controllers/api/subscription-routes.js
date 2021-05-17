const router = require('express').Router();
const { User, Subscription, UserSub } = require('../../models');

router.get('/', (req, res) => {
  // find all subscriptions
  Subscription.findAll({
    attributes: [
        'id', 
        'subscription_name'
        ],
    include: [
      {
          model: User,
          attributes: ['id', 'email'],
        }
    ]
  })
    .then(dbSubscriptionData => res.json(dbSubscriptionData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  // find a single subscription by its `id`
  Subscription.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
      'id', 
      'subscription_name'
      ],
  include: [
    {
        model: User,
        attributes: ['id', 'email'],
      }
  ]
})
    .then(dbSubscriptionData => {
    if (!dbSubscriptionData) {
        res.status(404).json({ message: 'No subscription found with this id' });
        return;
    }
    res.json(dbSubscriptionData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  // create a new subscription
  Subscription.create({
    subscription_name: req.body.subscription_name,
  })
  .then(dbSubscriptionData => res.json(dbSubscriptionData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Subscription.update(
    {
      subscription_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbSubscriptionData => {
    if (!dbSubscriptionData) {
        res.status(404).json({ message: 'No subscription found with this id' });
        return;
    }
    res.json(dbSubscriptionData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete subscription by its `id` value
  Subscription.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbSubscriptionData => {
    if (!dbSubscriptionData) {
        res.status(404).json({ message: 'No subscription found with this id' });
        return;
    }
    res.json(dbSubscriptionData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;
