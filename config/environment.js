/* Map each environment variable to an object property
* for better usage
* */
module.exports = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRATION_IN_MINUTES: process.env.JWT_EXPIRATION_IN_MINUTES,
  SQUARE_ACCESS_TOKEN: process.env.SQUARE_ACCESS_TOKEN,
  SQUARE_APPLICATION_ID: process.env.SQUARE_APPLICATION_ID,
  SQUARE_LOCATION_ID: process.env.SQUARE_LOCATION_ID,
  SQUARE_REDIRECT_URL: process.env.SQUARE_REDIRECT_URL,
  SQUARE_SIGNATURE: process.env.SQUARE_SIGNATURE,
  SQUARE_WEBHOOK_URL: process.env.SQUARE_WEBHOOK_URL,
  WEB_APP_URL: process.env.WEB_APP_URL,
};
