const User = require('../models/users');
const json = require('../helpers/json_response')
const statusCode = require("http-status-codes")
const {generateJwtToken} = require("../helpers/jwt");
const {ROLES, TYPES} = require("../constants/roles");
const {RESPONSE_MESSAGES} = require("../constants/response_message");
const {encryptPassword, compareEncryptedPassword, generateUserVerificationCode} = require("../helpers/functions");
const {nanoid} = require("nanoid");
const {sendUserVerificationEmail, sendForgotPasswordEmail} = require("../helpers/emails/emails")

const login = async (req, res) => {
    try {
        // get user email and password from request
        const {email, password} = req.body;
        // fetch user
        let user = await User.findOne({email: email});
        if (!user) return json(res, statusCode.BAD_REQUEST, "User not exist, please signup/register before signing in.");

        // check if password match
        const checkPassword = compareEncryptedPassword(password, user?.password)
        if (!checkPassword) return json(res, statusCode.BAD_REQUEST, "Invalid password.");

        // check verification
        if (!user?.isVerified) return json(res, statusCode.BAD_REQUEST, "Please verify your email address.");

        // generate jwt token
        const token = generateJwtToken(user)
        json(res, statusCode.OK, "Login successfully", {user, token});
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {
            user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR,
            system: error.message
        });
    }
};

const register = async (req, res) => {
    try {
        const {email, password} = req.body;
        // check if user exist
        let user = await User.findOne({email: email});
        if (user) return json(res, statusCode.BAD_REQUEST, "Email already registered.")

        // create user
        // generate verification code
        const verificationCode = generateUserVerificationCode()
        const data = new User(req.body);
        data.password = encryptPassword(password)
        data.verifyCode = verificationCode
        await data.save();

        // send verification email
        sendUserVerificationEmail(data?.email, verificationCode)

        // generate jwt token
        const token = generateJwtToken(data)

        json(res, statusCode.OK, "Registered successfully", {user: data, token});
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {
            user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR,
            system: error.message
        });
    }
};

const verify = async (req, res) => {
    try {
        const {code} = req.query

        // find user by verification code
        const user = await User.findOne({verifyCode: code})
        if (!user) return json(res, statusCode.BAD_REQUEST, "Invalid verification code.")

        await User.findByIdAndUpdate(
            user?._id,
            {
                isVerified: true,
                verifyCode: null
            },
        );

        json(res, statusCode.OK, "Email verified successfully.");
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {
            user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR,
            system: error.message
        });
    }
};

const forgotPassword = async (req, res) => {
    try {
        const {email} = req.body

        // find user by verification code
        const user = await User.findOne({email: email})
        if (!user) return json(res, statusCode.BAD_REQUEST, "User not registered with this email address.")

        const newPassword = nanoid()
        user.password = encryptPassword(newPassword)
        user.save()

        sendForgotPasswordEmail(user?.email, newPassword)

        json(res, statusCode.OK, "Email send, please check inbox.");
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {
            user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR,
            system: error.message
        });
    }
};

 const me = async (req, res) => {
     try {
         // get email form request
         const { email } = req.user;
         // find user
         let user = await User.findOne({ email }).select("-password");
         // if not user found return error
         if (!user) return json(res, statusCode.NOT_FOUND, "User not exist!");
         // send data if user found
         json(res, statusCode.OK, RESPONSE_MESSAGES.DATA_FETCHED, {user, token: req.token});
     } catch (error) {
         json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
     }
 };
 
// const update = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updated = await Auth.findByIdAndUpdate(id, req.body, {
//             new: true,
//             runValidators: true,
//         });
//         if (!updated) {
//             return json(res, statusCode.NOT_FOUND, "User not found.");
//         }
//         json(res, statusCode.OK, "User updated successfully");
//     } catch (error) {
//         json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
//     }
// };

// const allUsers = async (req, res) => {
//     try {
//         const data = await Auth.find({type: 'user', role: 1});
//         json(res, statusCode.OK, RESPONSE_MESSAGES.DATA_FETCHED,data);
//     } catch (error) {
//         json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
//     }
// };

// const destroy = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const deleted = await Auth.findByIdAndDelete(id);
//         if (!deleted) {
//             return json(res, statusCode.NOT_FOUND, "User not found.");
//         }
//         json(res, statusCode.OK, "User deleted successfully");
//     } catch (error) {
//         json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
//     }
// };


module.exports.AuthController = {
    login,
    register,
    verify,
    forgotPassword,
    me,
    // update,
    // allUsers,
    // destroy
};
