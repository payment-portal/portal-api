const registerController = require("./register");
const loginController = require("./login");
const userController = require("./auth/user");

exports.register = registerController;
exports.login = loginController;
exports.user = userController.getCurrentlySignedInUser;