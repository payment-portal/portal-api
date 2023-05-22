const jwt = require('jsonwebtoken');
const { sendApiErrorResponse } = require('../utils/response.utils');
const { decryptEncryption } = require('../utils/encryption.utils');
const User = require('../models/user');
const environment = require('../../config/environment');

exports.authenticationMiddleWare = async function (req, res, next) {
  try {
    let accessToken = req.headers.authorization;
    accessToken = accessToken.replace('Bearer ', '').trim();
    accessToken = decryptEncryption(accessToken);
    const { _id } = jwt.decode(accessToken, environment.JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    sendApiErrorResponse(res, 'Access to this resource has been denied. Sign in and try again.', 401);
  }
};