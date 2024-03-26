const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

const UserService = require("../services/user.service");
const UserServiceInstance = new UserService();

const secret = process.env.SECRET_KEY;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: secret,
};

const strategy = new JWTStrategy(options, async (payload, done) => {
  try {
    console.log("PAYLOAD", payload); // {username: 'alok722'}
    const user = await UserServiceInstance.findByUsername(payload.username);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = (passport) => {
  passport.use(strategy);
};
