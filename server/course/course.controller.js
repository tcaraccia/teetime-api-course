const Course = require('./course.model');

/**
 * Load course and append to req.
 */
function load(req, res, next, id) {
  Course.get(id)
      .then((course) => {
        req.course = course; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch((e) => {
        next(e);
      });
}

function get(req, res) {
  return res.json(req.course);
}

function create(req, res, next) {
  const course = new Course({
    name: req.body.name,
    email: req.body.email,
    description: req.body.description,
    location: req.body.location,
    thumbnail: req.body.thumbnail,
    banner: req.body.banner
  });
  course.save()
    .then(savedCourse => res.json(savedCourse))
    .catch(e => next(e));
}

function update(req, res, next) {
  const course = req.course;
  course.name = req.body.name;
  course.email = req.body.email;
  course.description = req.body.description;
  course.location = req.body.location;
  course.thumbnail = req.body.thumbnail;
  course.banner = req.body.banner;

  course.save()
    .then(savedCourse => res.json(savedCourse))
    .catch(e => next(e));
}

function list(req, res, next) {
  const date = req.query.date;
  const { limit = 50, skip = 0 } = req.query;

  if (date) {
    Course.listFromDate(date)
    .then(courses => res.json(courses))
    .catch(e => next(e));
  } else {
    Course.list({ limit, skip })
    .then(courses => res.json(courses))
    .catch(e => next(e));
  }
}

function remove(req, res, next) {
  const course = req.course;
  course.remove()
    .then(deletedCourse => res.json(deletedCourse))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
