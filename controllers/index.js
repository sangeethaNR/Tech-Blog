// const router = require('express').Router();

// const apiRoutes = require('./api');
// const homeRoutes = require('./homeRoutes');

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

// module.exports = router;
const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
//const dashboardRoutes = require('./dashboard-routes.js');
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;