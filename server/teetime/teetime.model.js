const mongoose = require('mongoose');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');

const TeetimeSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  date: {
    type: Date,
    default: Date.now()
  },
  times: [{
    time: Date,
    players: [String],
  }],
  slots: {
    type: Number,
    default: 4
  }
});

TeetimeSchema.statics = {
  /**
   * Get Teetime
   * @param {ObjectId} id - The objectId of Teetime.
   * @returns {Promise<Course, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((Teetime) => {
        if (Teetime) {
          return Teetime;
        }
        const err = new APIError('No such Course exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  getForCourse(courseId) {
    return this.find({ course: new mongoose.Types.ObjectId(courseId) })
    .exec();
  },
    /**
   * Gets Teetime for Course on specified date
   * @param {string} id - Id of the course to find
   * @param {string} date - Date of the teetime.
   * @returns {Promise<Teetime[]>}
   */
  getForCourseAndDate(courseId, _date) {
    return this.findOne({ course: new mongoose.Types.ObjectId(courseId), date: _date })
    .exec();
  },

  /**
   * List Teetimes in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of Teetimes to be skipped.
   * @param {number} limit - Limit number of Teetimes to be returned.
   * @returns {Promise<Teetime[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

module.exports = mongoose.model('Teetime', TeetimeSchema);

