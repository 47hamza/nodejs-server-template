const Auth = require('../models/users');
const json = require('../helpers/json_response')
const statusCode = require("http-status-codes")
const {generateJwtToken} = require("../helpers/jwt");
const {ROLES, TYPES} = require("../constants/roles");
const {RESPONSE_MESSAGES} = require("../constants/response_message");

const login = async (req, res) => {
    try {
        // get user email from request
        const { email } = req.body;
        // fetch user
        let user = await findUserByEmail(email);
        if (!user) return json(res, statusCode.BAD_REQUEST, "User not registered, please signup/register before signing in.");
        // generate jwt token
        const token = generateJwtToken(user)
        json(res, statusCode.OK, "Login successfully", {user, token});
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};

const register = async (req, res) => {
    try {
        const { email } = req.body;
        // check if user exist
        let user = await findUserByEmail(email);
        if (user) {
            // generate jwt token
            const token = generateJwtToken(user)
            return json(res, statusCode.OK, "Email already registered.", {user: user, token});
        }
        // create user if not exist
        const newUser = new Auth(req.body);
        newUser.role = ROLES.USER;
        newUser.type = TYPES.USER
        await newUser.save();

        // generate jwt token
        const token = generateJwtToken(newUser)
        json(res, statusCode.OK, "Registered successfully", {user: newUser, token});
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};

const me = async (req, res) => {
    try {
        // get email form request
        const { email } = req.user;
        // find user
        let user = await Auth.findOne({ email }).select("-password");
        // if not user found return error
        if (!user) return json(res, statusCode.NOT_FOUND, "User not exist!");
        // send data if user found
        json(res, statusCode.OK, RESPONSE_MESSAGES.DATA_FETCHED, {user, token: req.token});
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};

const update = async (req, res) => {
    try {
        const { id } = req.params;
        const updated = await Auth.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updated) {
            return json(res, statusCode.NOT_FOUND, "User not found.");
        }
        json(res, statusCode.OK, "User updated successfully");
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};

const allUsers = async (req, res) => {
    try {
        const data = await Auth.find({type: 'user', role: 1});
        json(res, statusCode.OK, RESPONSE_MESSAGES.DATA_FETCHED,data);
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};

const destroy = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Auth.findByIdAndDelete(id);
        if (!deleted) {
            return json(res, statusCode.NOT_FOUND, "User not found.");
        }
        json(res, statusCode.OK, "User deleted successfully");
    } catch (error) {
        json(res, statusCode.INTERNAL_SERVER_ERROR, {user: RESPONSE_MESSAGES.USER_INTERNAL_SERVER_ERROR, system: error.message});
    }
};


module.exports.AuthController = {
    login,
    register,
    me,
    update,
    allUsers,
    destroy
};
