const mongoose = require('mongoose');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');

const TeetimeSchema = new mongoose.Schema({
  course: {
    type: String,
    ref: mongoose.Schema.Types.ObjectId
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

