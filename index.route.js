const express = require('express');
const courseRoutes = require('./server/course/course.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount course routes at /courses
router.use('/courses', courseRoutes);


module.exports = router;
