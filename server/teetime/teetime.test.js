const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaidate = require('chai-datetime');

chai.use(chaidate);

const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Teetime APIs', () => {
  let teetime = {
    date: Date.now(),
    times: [
      {
        date: Date.now,
        players: ['3589878']
      }
    ]
  };
});
