const Joi = require('joi');

module.exports = {
  // POST /api/courses
  createCourse: {
    body: {
      email: Joi.string().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).required()

    }
  },

  // UPDATE /api/courses/:courseId
  updateCourse: {
    body: {
      email: Joi.string().regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/).required()
    },
    params: {
      courseId: Joi.string().hex().required()
    }
  }
};
