const UserModel = require('../../../models/user');
const { sendApiSuccessResponse } = require('../../../utils/response.utils');

async function getCurrentlySignedInUser(req, res) {
  let user = await UserModel.findById(req.user._id).select("_id firstName lastName");
  sendApiSuccessResponse(res, user, 'Successfully fetched signed in user data');
}

module.exports = { getCurrentlySignedInUser };