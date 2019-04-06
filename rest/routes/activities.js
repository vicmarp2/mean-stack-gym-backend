const express = require("express");
const checkAuth = require("../middleware/check-auth");

const ActivitiesController = require("../controllers/activities");

const router = express.Router();

/**
 * @apiDefine ActivityNotFoundError
 *
 * @apiError ActivityNotFoundError Fetching activity failed!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        message: "Fetching activity failed!"
 *     }
 */

 /**
 * @apiDefine ReservationNotFoundError
 *
 * @apiError ReservationNotFoundError Fetching reservation failed!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        message: "Fetching reservation failed!"
 *     }
 */

/**
 * @api {get} /api/v1/activities Request Activities information
* @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetActivities
 * @apiGroup Activities
 *
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Activity[]}  activities Activities list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Activities fetched successfully!",
 *       activities,
 *     }
 *
 * @apiUse ActivityNotFoundError
 */
router.get("", checkAuth, ActivitiesController.getActivities);

/**
 * @api {get} api/v1/activities/:id Request Activity information
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetActivity
 * @apiGroup Activities
 *
 * @apiParam {String} id Activities unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Activity}  activity Activity information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Activity fetched successfully!",
 *       activity,
 *     }
 *
 * @apiUse ActivityNotFoundError
 */
router.get("/:id", checkAuth, ActivitiesController.getActivity);

/**
 * @api {get} api/v1/activities/reservations/user/:id Request Reservations of user
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetUserReservations
 * @apiGroup Activities
 *
 * @apiParam {String} id User unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Reservation[]}  reservations User Reservations.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Reservations fetched successfully!",
 *       reservations,
 *     }
 *
 * @apiUse ReservationNotFoundError
 */
router.get("/reservations/user/:id", checkAuth, ActivitiesController.getUserReservations);

/**
 * @api {get} api/v1/activities/reservations/event/:id Request Reservations over an existing event
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetEventReservations
 * @apiGroup Activities
 *
 * @apiParam {String} id Event unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Reservation[]}  reservations Event reservations.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Reservations fetched successfully!",
 *       reservations,
 *     }
 *
 * @apiUse ReservationNotFoundError
 */
router.get("/reservations/event/:id", checkAuth, ActivitiesController.getEventReservations);

module.exports = router;
