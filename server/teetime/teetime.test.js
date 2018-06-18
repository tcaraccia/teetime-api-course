const mongoose = require('mongoose');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const chaidate = require('chai-datetime');

chai.use(chaidate);

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
});
