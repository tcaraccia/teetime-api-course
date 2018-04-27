const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Course APIs', () => {
  let course = {
    email: 'admin@pilara.com',
    description: 'PILARA',
    name: 'PILARA',
    thumbnail: 'http://mythumb.com/thumb.png',
    banner: 'http://mythumb.com/banner.png',
    location: {
      lat: '13.5',
      long: '-9.32',
      city: 'Pilar',
      state: 'Buenos Aires',
      zone: 'GBA Norte'
    }
  };

  describe('# POST /api/courses', () => {
    it('should create a new course', (done) => {
      request(app)
        .post('/api/courses')
        .send(course)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(course.email);
          expect(res.body.name).to.equal(course.name);
          expect(res.body.description).to.equal(course.description);
          expect(JSON.stringify(res.body.location)).to.equal(JSON.stringify(course.location));
          expect(res.body.thumbnail).to.equal(course.thumbnail);
          expect(res.body.banner).to.equal(course.banner);
          course = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/courses/:courseId', () => {
    it('should get course details', (done) => {
      request(app)
        .get(`/api/courses/${course._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(course.email);
          expect(res.body.name).to.equal(course.name);
          expect(res.body.description).to.equal(course.description);
          expect(JSON.stringify(res.body.location)).to.equal(JSON.stringify(course.location));
          expect(res.body.thumbnail).to.equal(course.thumbnail);
          expect(res.body.banner).to.equal(course.banner);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when course does not exists', (done) => {
      request(app)
        .get('/api/courses/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/courses/:courseId', () => {
    it('should update course details', (done) => {
      course.coursename = 'admin@pilara.com';
      request(app)
        .put(`/api/courses/${course._id}`)
        .send(course)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal(course.email);
          expect(res.body.name).to.equal(course.name);
          expect(res.body.description).to.equal(course.description);
          expect(res.body.thumbnail).to.equal(course.thumbnail);
          expect(res.body.banner).to.equal(course.banner);
          expect(JSON.stringify(res.body.location)).to.equal(JSON.stringify(course.location));

          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/courses/', () => {
    it('should get all courses', (done) => {
      request(app)
        .get('/api/courses')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all courses (with limit and skip)', (done) => {
      request(app)
        .get('/api/courses')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/courses/', () => {
    it('should delete course', (done) => {
      request(app)
        .delete(`/api/courses/${course._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.email).to.equal('admin@pilara.com');
          expect(res.body.description).to.equal(course.description);
          done();
        })
        .catch(done);
    });
  });
});
