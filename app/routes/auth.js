const trimRequest = require("trim-request");
const authRouter = require("express").Router();
const authController = require("../controllers/auth");
const { authenticationMiddleWare } = require("../middleware/auth");

authRouter.get(
	"/user", 
	authenticationMiddleWare,
	authController.user
);

authRouter.post(
	"/register",
	trimRequest.all,
	authController.register
);

authRouter.post(
	"/login",
	trimRequest.all,
	authController.login
);

module.exports = authRouter;