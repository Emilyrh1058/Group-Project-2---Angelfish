const router = require('express').Router();
const { User, Subscription, UserSub } = require('../../models');

// get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
    include : [
        {
            model: Subscription,
            attributes: ['id', 'subscription_name']
        }
    ]
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Subscription,
        attributes: ['id', 'subscription_name']
      }
    ]
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
  User.create(req.body)
  .then((user) => {
      //if there's user subscriptions, we need to create pairings to bulk create in the UserSub model
      if (req.body.subscriptionIds.length) {
          const userSubIdArr = req.body.subscriptionIds.map((subscription_id) => {
              return {
                  user_id: user.id,
                  subscription_id,
              };
          });
          return UserSub.bulkCreate(userSubIdArr);
      }
      // if no user subscriptions, just respond
      res.status(200).json(user);
  })
    .then((userSubIds) => res.status(200).json(userSubIds))
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;
  
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.put('/:id', (req, res) => {

  // pass in req.body instead to only update what's passed through
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then((user) => {
        //find all associated subscriptions from UserSub
        return UserSub.findAll({where: {user_id: req.params.id}});
    })
    .then((userSubs) => {
        //get list of current subscription_ids
        const userSubIds = userSubs.map(({ subscription_id }) => subscription_id);
        //create filtered list of new subscription_ids
        const newUserSubs = req.body.subscriptionIds
            .filter((subscription_id) => !userSubIds.includes(subscription_id))
            .map((subscription_id) => {
                return {
                    user_id: req.params.id,
                    subscription_id,
                };
            });
        //figure out which ones to remove
        const userSubsToRemove = userSubs
            .filter(({ subscription_id }) => !req.body.subscriptionIds.includes(subscription_id))
            .map(({ id }) => id);

        //run both actions
        return Promise.all([
            UserSub.destroy({ where: { id: userSubsToRemove } }),
            UserSub.bulkCreate(newUserSubs),
        ]);
    })
    .then((updatedUserSubs) => res.json(updatedUserSubs))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;