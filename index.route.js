const express = require('express');
const courseRoutes = require('./server/course/course.route');
const authRoutes = require('./server/auth/auth.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount course routes at /courses
router.use('/courses', courseRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
