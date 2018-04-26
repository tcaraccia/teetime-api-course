const Joi = require('joi');

module.exports = {
  // POST /api/courses
  createCourse: {
    body: {
      email: Joi.string().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).required(),
      name: Joi.string().required(),
      description: Joi.string().required()
    }
  },

  // UPDATE /api/courses/:courseId
  updateCourse: {
    body: {
      email: Joi.string().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).required(),
      name: Joi.string().required(),
      description: Joi.string().required()
    },
    params: {
      courseId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      email: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
