const { GeneralError, NotFound, UnAuthorized } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const messages = require("../utils/constants/messages");
const moment = require("moment");
const { USER_ROLE, USER_STATUS } = require("../utils/constants/enum");
const { hashPassword, comparePassword } = require("../services/bcrypt");
const userModel = require("../models/user.model");
const config = require("../utils/config");
// const { sendSMS } = require("../services/twilio");
const { generateToken } = require('../helpers/auth.helper');

module.exports = {
  signUpEmail: async (req, res, next) => {
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        role,
        password,
        confirm_password,
      } = req.body;
      const userExists = await userModel.isUserExistByEmailId(email);
      if (userExists.rowCount > 0) {
        next(
          new GeneralError(
            messages.USER_ALREADY_EXISTS,
            undefined,
            config.HTTP_ACCEPTED
          )
        );
      } else {
        if (password === confirm_password) {
          const encryptedPassword = await hashPassword(password);
          const createdAt = moment(Date.now()).format("YYYY-MM-DD");
          const newUser = await userModel.createUserByEmail({
            first_name,
            last_name,
            email,
            phone_number,
            role,
            encryptedPassword,
            active: USER_STATUS.active,
            createdAt,
          });
          next(
            new GeneralResponse(
              messages.REGISTER_SUCCESS,
              undefined,
              config.HTTP_CREATED
            )
          );
        } else {
          next(
            new GeneralError(
              messages.PASSWORD_DOES_NOT_MATCH,
              undefined,
              config.HTTP_BAD_REQUEST
            )
          );
        }
      }
    } catch (err) {
      next(new GeneralError(messages.REGISTER_FAILURE));
    }
  },

  signUpMobile: async (req, res, next) => {
    const { phone_number, first_name, last_name, role } = req.body();
    try {
      const newUser = await userModel.createUserByMobile({
        first_name,
        last_name,
        phone_number,
        role,
        active: USER_STATUS.active,
        createdAt,
      });
      next(
        new GeneralResponse(
          messages.REGISTER_SUCCESS,
          undefined,
          config.HTTP_CREATED
        )
      );
    } catch (err) {
      next(new GeneralError(messages.REGISTER_FAILURE));
    }
  },

  sendSMS: async (req, res, next) => {},

  login : async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.isUserExistByEmailId(email);
      if(user.rowCount === 0){
        next(new GeneralError(messages.USER_NOT_FOUND, undefined, config.HTTP_ACCEPTED));
      }
      else{
        let isPasswordMatched = await comparePassword(password, (user.rows[0].hash).toString());
        if (!isPasswordMatched) { 
          next(new UnAuthorized(messages.INCORRECT_CREDENTIALS, undefined, config.HTTP_BAD_REQUEST));
         }
        else {
          let token = generateToken({
            id                  : user.rows[0].id,
            isLoggedIn          : true,
            firstName : user.rows[0].first_name,
            lastName : user.rows[0].last_name
          }, process.env.JWT_LOGIN_EXPIRY);
          next(new GeneralResponse(messages.LOGIN_SUCCESS, {token: token}, config.HTTP_SUCCESS));
        }
      }
    }
    catch(err)
    {
      console.log(err);
      next(new GeneralError(messages.LOGIN_FAILURE));
    }
  }
};
