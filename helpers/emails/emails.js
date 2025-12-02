const nodemailer = require("nodemailer")
const smtpTransport = require("nodemailer-smtp-transport")
const {CONFIG} = require("../../config/config");
const {userEmailVerificationTemplate, userForgotPasswordTemplate} = require("./templates");

const transporter = nodemailer.createTransport(
    smtpTransport({
        service: CONFIG.MAIL_SERVICE,
        host: CONFIG.MAIL_HOST,
        secure: true,
        auth: {
            user: CONFIG.MAIL_USERNAME,
            pass: CONFIG.MAIL_PASSWORD,
        },
    }),
)

// send user verification mail
module.exports.sendUserVerificationEmail = function (email, code) {
    const mailOptions = {
        from: CONFIG.MAIL_USERNAME,
        to: email,
        subject: `Verify Your Email - ${CONFIG.COMPANY_NAME}`,
        html: userEmailVerificationTemplate(code)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    });
};

// send forgot password mail
module.exports.sendForgotPasswordEmail = function (email, password) {
    const mailOptions = {
        from: CONFIG.MAIL_USERNAME,
        to: email,
        subject: `Forgot Password - ${CONFIG.COMPANY_NAME}`,
        html: userForgotPasswordTemplate(password)
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
    });
};
