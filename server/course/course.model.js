const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Course Schema
 */
const CourseSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,
    trim: true,
    unique: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    lat: String,
    long: String,
    city: String,
    state: String,
    zone: String
  },
  thumbnail: {
    type: String,
    default: 'http://via.placeholder.com/140x100'
  },
  banner: {
    type: String,
    default: 'http://via.placeholder.com/350x150'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CourseSchema.method({
});

/**
 * Statics
 */
CourseSchema.statics = {
  /**
   * Get Course
   * @param {ObjectId} id - The objectId of Course.
   * @returns {Promise<Course, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Course) => {
        if (Course) {
          return Course;
        }
        const err = new APIError('No such Course exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List Courses in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Courses to be skipped.
   * @param {number} limit - Limit number of Courses to be returned.
   * @returns {Promise<Course[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Course
 */
module.exports = mongoose.model('Course', CourseSchema);
