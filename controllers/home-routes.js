const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Subscription, UserSub } = require('../models');

router.get('/', (req, res) => {
    console.log('======================');
    res.render('homepage', {
        loggedIn: req.session.loggedIn
    });
  });

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/kids', (req, res) => {
    res.render('kids');
});

module.exports = router;