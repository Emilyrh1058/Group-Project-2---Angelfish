const router = require('express').Router();

const apiRoutes = require('./api/');
const homeRoutes = require('./home-routes.js');
const accountRoutes = require('./account-routes.js');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/account', accountRoutes);

module.exports = router;
