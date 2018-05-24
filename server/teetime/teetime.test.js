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
        time: Date.now,
        players: ['3589878']
      }
    ]
  };

  describe('# POST /api/teetimes', () => {
    it('should create a new teetime', (done) => {
      request(app)
        .post('/api/teetimes')
        .send(teetime)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.slots).to.equal(4);
          expect(new Date(res.body.date).getTime()).to.equal(teetime.date);
          expect(JSON.stringify(res.body.times[0].players)).to.equal(JSON.stringify(teetime.times[0].players));
          teetime = res.body;
          done();
        })
        .catch(done);
    });
  });
});
