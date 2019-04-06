const express = require("express");

const AuthController = require("../controllers/auth");

const router = express.Router();

/**
 * @api {post} api/v1/auth Request Token
 * @apiName GetToken
 * @apiGroup Auth
 *
 * @apiParam (body) {String} email Users email.
 * @apiParam (body) {String} password Users password.
 *
 * @apiParamExample {json} Request-Example:
 * { "email": "email@email.com",
 *    "password": "pass4me" }
 * @apiSuccess {String} token Valid access token.
 * @apiSuccess {Number} expiresIn Duration of the token in seconds.
 * @apiSuccess {String} userId Id of the user authenticated.
 * @apiSuccess {Boolean} userAdmin "true" if the user authenticated is admin of the system.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       token: "fsadfdSFASAfASDfsaFdsaFSA",
 *       expiresIn: "3600",
 *       userId: "32fSD453FDAERA"
 *       userAdmin: "true"
 *     }
 *
  * @apiError InvalidAuth The credentials were not valid.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Invalid credentials.
 *     {
 *       "message": "Auth failed"
 *     }
 */
router.post("", AuthController.getToken);


module.exports = router;
