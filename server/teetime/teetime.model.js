const mongoose = require('mongoose');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const moment = require('moment');

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
    fee: Number
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
        const err = new APIError('No such Teetime exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * Gets Teetime for specified course.
   * @param {number} skip - Number of Teetimes to be skipped.
   * @param {number} limit - Limit number of Teetimes to be returned.
   * @returns {Promise<Teetime[]>}
   */
  getOrCreate(course, _date) {
    return this.find({ course: new mongoose.Types.ObjectId(course._id), date: _date })
    .exec()
    .then((teetime) => {
      if (teetime) {
        return teetime;
      }
      return this.createForCourseDate(course, _date)
      .exec()
      .then((result) => {
        if (result) {
          return result;
        }
        const err = new APIError('Error creating default teetime!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
    });
  },
  /**
   * Gets Teetime for specified course.
   * @param {number} skip - Number of Teetimes to be skipped.
   * @param {number} limit - Limit number of Teetimes to be returned.
   * @returns {Promise<Teetime[]>}
   */
  getForCourse(courseId) {
    return this.find({ course: new mongoose.Types.ObjectId(courseId) })
    .exec();
  },
    /**
   * Gets Teetime for Course between date range
   * @param {string} id - Id of the course to find
   * @param {string} startDate - Start date of the teetime.
   * @param {string} endDate - End date of the teetime.
   * @returns {Promise<Teetime[]>}
   */
  getBetweenDates(startDate, endDate) {
    return this.find({
      date: { $gte: startDate, $lte: endDate }
    })
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
  },
  /**
   * Creates default teetimes based on a given date and course
   * @param {*} course - a json model of a course
   * @param {*} _date - desired date to create teetime
   */
  createDefaultTimes(course, _date) {
    const courseOpenTime = moment(course.times.open);
    const initialMoment = moment(_date).set({
      hour: courseOpenTime.get('h'),
      minute: courseOpenTime.get('m'),
      second: '00'
    });
    const minutesDiff = Math.abs(
      new Date(course.times.close) - new Date(course.times.open))
       / (1000 * 60);
    const timesQty = minutesDiff / course.slots.frequency;
    const times = Array.from({ length: timesQty }, (x, i) => {
      const time = {};
      time.time = (i === 0) ? initialMoment.toDate() : initialMoment.add(course.slots.frequency, 'm').toDate();
      time.players = Array.from({ length: course.slots.quantity });
      time.fee = course.fee.regular;
      return time;
    });
    return times;
  }
};

module.exports = mongoose.model('Teetime', TeetimeSchema);

