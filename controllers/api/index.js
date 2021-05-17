const router = require('express').Router();

const userRoutes = require('./user-routes.js');
const subscriptionRoutes = require('./subscription-routes');

router.use('/users', userRoutes);
router.use('/subscriptions', subscriptionRoutes);

module.exports = router;