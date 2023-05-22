const UserModel = require('../../models/user');
const { sendApiErrorResponse, sendApiSuccessResponse } = require('../../utils/response.utils');

async function RegisterNewUser(req, res) {
  try {
    const existingAccountWithEmailAddress = await UserModel.findByEmailAddress(req.body.email);
    if (existingAccountWithEmailAddress) {
      throw new Error('An account with this email address already exists.');
    }
    const user = new UserModel(req.body);
    await user.save();
    sendApiSuccessResponse(
      res,
      { user: await user.getPublicUserData(), accessToken: user.createAccessToken() },
      'Your account has been successfully created.',
    );
  } catch (error) {
    sendApiErrorResponse(res, error);
  }
}

module.exports = RegisterNewUser;
