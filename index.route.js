const express = require('express');
const courseRoutes = require('./server/course/course.route');
const teetimeRoutes = require('./server/teetime/teetime.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

router.use('/courses', courseRoutes);
router.use('/teetimes', teetimeRoutes);

module.exports = router;
