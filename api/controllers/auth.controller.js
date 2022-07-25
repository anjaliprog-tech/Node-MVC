const { GeneralError, NotFound } = require("../utils/error");
const { GeneralResponse } = require("../utils/response");
const messages = require("../utils/constants/messages");
const moment = require('moment');
const { USER_ROLE, USER_STATUS } = require("../utils/constants/enum"); 
const { hashPassword, comparePassword } = require('../services/bcrypt');
const userModel = require('../models/user.model');
const config = require("../utils/config");

exports.signUp = async (req, res, next) => {
    try {
        const { first_name, last_name, email, phone_number, role, password, confirm_password } = req.body;
        userModel.isUserExistByEmailId(email, async (err, response) =>{
            if (!err && (response.rowCount) > 0)
                next(new GeneralError(messages.USER_ALREADY_EXISTS, undefined, config.HTTP_ACCEPTED ));
            else {
                if(password === confirm_password)
                {
                    const encryptedPassword = await hashPassword(password);
                    const createdAt = moment(Date.now()).format('YYYY-MM-DD');
                    userModel.createUser({first_name, last_name, email, phone_number, role, encryptedPassword, active : USER_STATUS.active, createdAt}, (err, response)=>{
                        if(err)
                        {
                            next(new GeneralError( messages.REGISTER_FAILURE ))
                        }
                        else{
                            next(new GeneralResponse( messages.REGISTER_SUCCESS, undefined, config.HTTP_CREATED ));
                        }
                    })
                }
                else{
                    next(new GeneralError( messages.PASSWORD_DOES_NOT_MATCH, undefined, config.HTTP_BAD_REQUEST ));
                }
            }
        });
    }
    catch (err) {
        next(new GeneralError( messages.REGISTER_FAILURE ))
    }
}