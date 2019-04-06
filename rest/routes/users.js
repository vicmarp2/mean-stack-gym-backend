const express = require("express");

const UserController = require("../controllers/users");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound Fetching users failed!.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *        message: "Fetching user failed!"
 *     }
 */

/**
 * @api {get} /api/v1/users Request Users information
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetUsers
 * @apiGroup Users
 *
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {User[]}  users Users list.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "Users fetched successfully!",
 *       users,
 *     }
 *
 * @apiUse UserNotFoundError
 */
router.get("", checkAuth, UserController.getUsers);

/**
 * @api {get} api/v1/users/:userId Request User information
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetUser
 * @apiGroup Users
 *
 * @apiParam {String} userId Users unique ID.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {User}  user User information.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       message: "User fetched successfully!",
 *       user,
 *     }
 *
 * @apiUse UserNotFoundError
 */
router.get("/:userId", checkAuth, UserController.getUser);


/**
 * @api {get} api/v1/users/access/event Request User access to event
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetUserAccessToEvent
 * @apiGroup Users
 *
 * @apiParam {String} userId Users unique ID.
 * @apiParam {String} eventId Event unique ID.
 *
 * @apiSuccess {Boolean} access "True" if user has reservation for the event.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       access: "true",
 *     }
 *
 * @apiUse UserNotFoundError
 * 
 * @apiError NoReservationFound The reservation for the User to the Event was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Found
 *     {
 *       "message": "No reservation found"
 *     }
 */
router.get("/access/event", checkAuth, UserController.getUserAccessToEvent);

/**
 * @api {get} api/v1/users/access/:userId Request User access
 * @apiHeader {String} token Authorization token.
 * @apiHeaderExample {json} Header-Example:
 * { "Authorization": "Bearer {{token}}" }
 * @apiName GetUserAccess
 * @apiGroup Users
 *
 * @apiParam {String} userId Users unique ID.
 *
 * @apiSuccess {Boolean} access "True" if user allowed.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       access: "true",
 *     }
 *
 * @apiUse UserNotFoundError
 * 
 */
router.get("/access/:userId", checkAuth, UserController.getUserAccess);

module.exports = router;
