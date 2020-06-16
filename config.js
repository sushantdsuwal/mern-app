const JWTSECRET = process.env.JWT_KEY;
const TEST_KEY = process.env.TEST;

module.exports = {
  jwtSecret: JWTSECRET,
  MONGODB_URI: 'mongodb://localhost:27017/basic-curd-app',
  test: TEST_KEY,
};
