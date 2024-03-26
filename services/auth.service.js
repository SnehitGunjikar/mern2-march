const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("./user.service");
const UserServiceInstance = new UserService();

const SECRET_KEY = process.env.SECRET_KEY;

class AuthService {
  encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt();
    console.log('salt', salt)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };

  signup = async (user) => {
    try {
      const hashedPassword = await this.encryptPassword(user.password);
      const result = await UserServiceInstance.register({
        ...user,
        password: hashedPassword,
      });
      return result;
    } catch (error) {
      throw error;
    }
  };

  verifyPassword = async (username, password) => {
    try {
      const userFromDb = await UserServiceInstance.findByUsername(username);
      const isValid = await bcrypt.compare(password, userFromDb.password);
      if (isValid) {
        return userFromDb;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  };

  generateToken = (username) => {
    try {
      const payload = {
        username: username
      }
      const option = {
        expiresIn: '1h'
      }
      const token = jwt.sign(payload, SECRET_KEY, option);
      return token;
    } catch (error) {
    throw error;
    }
  }

  login = async (user) => {
    try {
      const { username, password } = user;
      const response = await this.verifyPassword(username, password);
      if (response) {
        const token = this.generateToken(response.username);
        return {
          isLoggedIn: true,
          token,
        };
      } else {
        return {
          isLoggedIn: false,
        };
      }
    } catch (error) {
      throw error;
    }
  };
}

module.exports = AuthService;
