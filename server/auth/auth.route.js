const express = require('express');
const validate = require('express-validation');
const expressJwt = require('express-jwt');
const paramValidation = require('../../config/param-validation');
const authCtrl = require('./auth.controller');
const config = require('../../config/config');

const router = express.Router(); // eslint-disable-line new-cap

/**
 * @api {post} /api/v1/auth/login Login
 * @apiName Login
 * @apiGroup Auth
 * @apiVersion 0.1.0
 * @apiParam {String} email User Email.
 * @apiParam {String} password User Password.
 *
 * @apiExample {js} Example usage:
 * const data = {
 *        "email": "bernard@dot.com",
 *       "password": "greenTentacle!"
 * }
 *
 * $http.post(data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTPS 200 OK
 *     {
 *      "token": "APP_TOKEN",
 *      "email": "bernard@dot.com"
 *    }
 *
 */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

/** GET /api/auth/random-number - Protected route,
 * needs token returned by the above as header. Authorization: Bearer {token} */
router.route('/random-number')
  .get(expressJwt({ secret: config.jwtSecret }), authCtrl.getRandomNumber);

module.exports = router;
