const express = require('express');
const validate = require('express-validation');
const paramValidation = require('../../config/param-validation');
const courseCtrl = require('./course.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
 /**
 * @api {get} /api/v1/courses Retrieve all courses
 * @apiName GetAll
 * @apiGroup course
 * @apiVersion 0.1.0
 * @apiParam {Number} id courses unique ID.
 *
 * @apiSuccess {String} email Email of the course.
 * @apiSuccess {String} name  Name of the course.
 * @apiSuccess {String} description  Description of the course.
 * @apiSuccess {Json} location  Location of the course, described as a Json Object.
 * @apiSuccess {String} thumbnail  Url for the courses thumbnail.
 * @apiSuccess {String} banner  Url for the courses banner.
 *
 * @apiExample {js} Example usage:
 * $http.defaults.headers.common["authorization"] = token;
 * $http.get(url)
 *    .sucess((res,status) => handlerSuccess())
 *    .error((res,status) => handlerErrro());
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTPS 200 OK
 *     [{
 *       "_id": "57e8e94ea06a0c473bac50cc"
 *       "email": "admin@pilara.com",
 *       "name": "Pilara",
 *       "description": "Un campo de ensueño",
 *       "location": "{lat:'12.35', long:'14.95',city:'Pilar'
 *        ,state:'Buenos Aires',zone:'GBA Norte'}",
 *       "thumbnail": "http://cdnprovider/pilarathumb.png",
 *       "banner": "http://cdnprovider/pilarabanner.png"
 *      },
 *      {
 *       "_id": "57e8e94ea06a0c473bac50ca"
 *       "email": "admin@pacheco.com",
 *       "name": "Pacheco Golf Club",
 *       "description": "La mejor cancha de nordelta",
 *       "location": "{lat:'12,35', long:'14,95',city:'Pilar'
 *        ,state:'Buenos Aires',zone:'GBA Norte'}",
 *       "thumbnail": "http://cdnprovider/pachecothumb.png",
 *       "banner": "http://cdnprovider/pachecobanner.png"
 *      }]
 *
 */
  .get(courseCtrl.list)

 /**
 * @api {post} /api/v1/courses Create a course
 * @apiVersion 0.1.0
 * @apiName Create
 * @apiGroup course
 * @apiPermission authenticated course
 *
 * @apiParam (Request body) {String} name The course email
 *
 * @apiExample {js} Example usage:
 * const data = {
 *        "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 * }
 *
 * $http.defaults.headers.common["Authorization"] = token;
 * $http.post(url, data)
 *   .success((res, status) => doSomethingHere())
 *   .error((err, status) => doSomethingHere());
 *
 * @apiSuccess (Success 201) {String} message course saved successfully!
 * @apiSuccessExample {json} Success response:
 *     HTTPS 201 OK
 *     {
 *      "message": "course saved successfully!",
 *      "id": "57e903941ca43a5f0805ba5a"
 *    }
 *
 */
  .post(validate(paramValidation.createCourse), courseCtrl.create);

router.route('/:courseId')
 /**
 * @api {get} /api/courses/:id Retrieve one course
 * @apiName Get
 * @apiGroup course
 * @apiVersion 0.1.0
 * @apiParam {Number} id courses unique ID.
 * @apiPermission authenticated course
 *
 * @apiSuccess {String} email Email of the course.
 * @apiSuccess {String} firstName  FirstName of the course.
 * @apiSuccess {String} lastName  Lastname of the course.
 * @apiSuccess {String} enrolmentNumber EnrolmentNumber of the course.
 *
 * @apiSuccessExample {json} Success Response:
 *     HTTPS 200 OK
 *     {
 *       "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 *
 *     }
 *
 */
  .get(courseCtrl.get)

 /**
 * @api {put} /api/v1/courses/:id Update a course
 * @apiName Put
 * @apiGroup course
 * @apiVersion 0.1.0
 * @apiPermission authenticated course
 *
 * @apiParam {String} id course unique ID.
 * @apiParam (Request Body) {String} email The course email
 * @apiParam (Request Body) {String} firstName The course firstName
 * @apiParam (Request Body) {String} lastName The course lastName
 * @apiParam (Request Body) {String} enrolmentNumber The course enrolmentNumber
 *
 * @apiExample {js} Example usage:
 * const data = {
 *       "email": "bernard@dot.com",
 *       "firstName": "Bernard",
 *       "lastName": "Bernoulli",
 *       "enrolmentNumber": "69727979"
 * }
 *
 *
 * $http.default.headers.common["Authorization"] = token;
 * $http.put(url,data)
 *    .success((res,status)) => handleSuccess())
 *    .error((err,status)) => handleError());
 *
 * @apiSuccess (Success 201) {String} message course saved successfully!
 *
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "course update successfully!"
 *     }
 */
  .put(validate(paramValidation.updateCourse), courseCtrl.update)

 /**
 * @api {delete} /api/v1/courses/:id Delete a course
 * @apiName Delete
 * @apiGroup course
 * @apiVersion 0.1.0
 * @apiPermission authenticated course
 *
 * @apiParam {String} id course unique ID.
 *
 * @apiExample {js} Example usage:
 * $http.default.headers.common["Authorization"] = token;
 * $http.delete(url)
 *    .success((res,status)) => handleSuccess())
 *    .error((err,status)) => handleError());
 *
 * @apiSucess {String} message course deleted successfully!
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "message": "course deleted successfully!"
 *     }
 */
  .delete(courseCtrl.remove);

/** Load course when API with courseId route parameter is hit */
router.param('courseId', courseCtrl.load);

module.exports = router;
