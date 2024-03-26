const AuthService = require("../services/auth.service");
const AuthServiceInstance = new AuthService();

const postSignup = async (req, res) => {
  try {
    const result = await AuthServiceInstance.signup(req.body);
    res.json(result);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).json({
        message: "Failed to create new user",
        reason: "Already Exists in DB",
      });
    } else {
      res.status(500).json({ message: "Failed to create new user", error });
    }
  }
};

const postLogin = async (req, res) => {
  try {
    const result = await AuthServiceInstance.login(req.body);
    if (result.isLoggedIn) {
      res.cookie("remember_token", result.token, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.json(result);
    } else {
      res.status(403).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login user", error });
  }
};

module.exports = { postSignup, postLogin };
