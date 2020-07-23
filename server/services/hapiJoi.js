const Joi = require("@hapi/joi").extend(require("@hapi/joi-date"));
const emailJoiSchema = Joi.string().lowercase()
  .max(50)
  .email({
    minDomainSegments: 2,
    tlds: {
      allow: ["com", "net"],
    },
  })
  .required()
  .error(new Error("Invalid Email"));

const passwordJoi = (keyword) =>
  Joi.string()
    .regex(new RegExp(/^(?=[A-Za-z0-9@%&#]{8,20}$)(?=.*\d)(?=.*[A-Za-z]).*$/))
    .max(20)
    .min(8)

    .required()
    .messages({
      "string.pattern.base": `${keyword} must consist of an alphabet,a number and must consist of minimum 8 letters`,
      "string.empty": `${keyword} is required`,
      "string.base": `${keyword} should be string`,
      "string.min": `${keyword} must be minimum 8 characters`,
      "string.max": `${keyword} must be maximum 20 characters`,
      "string.alphanum": `${keyword} must be alphanumeric`,
      "any.required": `${keyword} is required`,
    });


  

const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: passwordJoi("password"),
});
const resendOtpSchema = Joi.object().keys({});

const signupSchema = Joi.object().keys({
  username: Joi.string().required(),
  email: emailJoiSchema,
  password: passwordJoi("password"),
});

const verifyUserSchema = Joi.object().keys({
  token: Joi.string().required(),
  username: Joi.string().required(),
});

module.exports = {
  loginSchema,
  signupSchema,
  resendOtpSchema,
  verifyUserSchema,
};
