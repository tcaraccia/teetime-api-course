const Teetime = require('./teetime.model');

/**
 * Load teetime and append to req.
 */
function load(req, res, next, id) {
  Teetime.get(id)
      .then((teetime) => {
        req.teetime = teetime; // eslint-disable-line no-param-reassign
        return next();
      })
      .catch((e) => {
        next(e);
      });
}

function get(req, res) {
  return res.json(req.teetime);
}

function create(req, res, next) {
  const teetime = new Teetime({
    course: req.body.course,
    date: req.body.date,
    times: req.body.times,
    slots: req.body.slot
  });
  teetime.save()
    .then(savedTeetime => res.json(savedTeetime))
    .catch(e => next(e));
}

function update(req, res, next) {
  const teetime = req.teetime;
  teetime.course = req.body.course;
  teetime.date = req.body.date;
  teetime.times = req.body.times;
  teetime.slots = req.body.slots;

  teetime.save()
    .then(savedTeetime => res.json(savedTeetime))
    .catch(e => next(e));
}

function list(req, res, next) {
  const { start, end } = req.query;
  Teetime.list({ date: { $gte: start, $lte: end } })
    .then(teetimes => res.json(teetimes))
    .catch(e => next(e));
}


function remove(req, res, next) {
  const teetime = req.teetime;
  teetime.remove()
    .then(deletedTeetime => res.json(deletedTeetime))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
