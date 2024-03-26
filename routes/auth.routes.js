const router = require("express").Router();
const { postSignup, postLogin } = require("../controllers/auth.controller");
const { userValidationSchema } = require("../validations/user.validator");
const { loginBodyValidationSchema } = require("../validations/auth.validator");
const { validateSchema } = require("../middlewares/validate.middleware");

const validateUser = validateSchema(userValidationSchema);
const validateLoginData = validateSchema(loginBodyValidationSchema);

router.post("/signup", validateUser, postSignup);
router.post("/login", validateLoginData, postLogin); //auth/login

module.exports = router;
