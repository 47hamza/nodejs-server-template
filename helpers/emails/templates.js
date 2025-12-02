const {CONFIG} = require("../../config/config");

module.exports.userEmailVerificationTemplate = (code) => {
    return `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Email Verification</title>
</head>
<body style="background:#f4f4f4;margin:0;padding:0;font-family:Arial, sans-serif;">

  <!-- Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.05);">

          <!-- HEADER / BANNER -->
          <tr>
            <td style="background:#0d6efd;padding:20px;text-align:center;">
              <img src="https://yourdomain.com/logo.png" alt="Logo" style="width:140px;margin-bottom:10px;" />
              <h2 style="color:#ffffff;margin:0;font-weight:600;">Welcome to ${CONFIG.COMPANY_NAME}</h2>
            </td>
          </tr>

          <!-- MESSAGE BODY -->
          <tr>
            <td style="padding:30px 40px;text-align:left;color:#333;font-size:16px;line-height:1.5;">
              <p>Hi there,</p>
              <p>Thank you for registering with <strong>${CONFIG.COMPANY_NAME}</strong>. To complete your registration and secure your account, please verify your email address by clicking the button below.</p>
            </td>
          </tr>

          <!-- BUTTON -->
          <tr>
            <td align="center" style="padding:20px;">
              <a href="${CONFIG.SERVER_URL}/api/auth/verify?code=${code}"
                 style="background:#0d6efd;color:#ffffff;text-decoration:none;padding:14px 28px;border-radius:6px;font-size:16px;display:inline-block;">
                Verify Email
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:25px 40px;text-align:left;color:#777;font-size:14px;line-height:1.5;">
              <p>If you did not register for a ${CONFIG.COMPANY_NAME} account, you may safely ignore this email.</p>
              <p style="margin-top:20px;">Best Regards,<br><strong>${CONFIG.COMPANY_NAME} Team</strong></p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>
`
}

module.exports.userForgotPasswordTemplate = (newPassword) => {
    return `
<!DOCTYPE html>
<html lang="en" style="margin:0;padding:0;">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Password Reset</title>
</head>
<body style="background:#f4f4f4;margin:0;padding:0;font-family:Arial, sans-serif;">

  <!-- Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 0 10px rgba(0,0,0,0.05);">

          <!-- HEADER / BANNER -->
          <tr>
            <td style="background:#0d6efd;padding:20px;text-align:center;">
              <img src="https://yourdomain.com/logo.png" alt="Logo" style="width:140px;margin-bottom:10px;" />
              <h2 style="color:#ffffff;margin:0;font-weight:600;">${CONFIG.COMPANY_NAME}</h2>
            </td>
          </tr>

          <!-- MESSAGE BODY -->
          <tr>
            <td style="padding:30px 40px;text-align:left;color:#333;font-size:16px;line-height:1.5;">
              <p>Hi there,</p>
              <p>You requested to reset your password for your <strong>${CONFIG.COMPANY_NAME}</strong> account.</p>
              <p>Your password has now been successfully updated. Below is your new password:</p>

              <div style="margin:20px 0;padding:12px 18px;background:#f1f3ff;border-left:4px solid #0d6efd;font-size:18px;color:#0d6efd;font-weight:bold;">
                ${newPassword}
              </div>

              <p>We highly recommend logging into your account and changing this password to something more secure.</p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="padding:25px 40px;text-align:left;color:#777;font-size:14px;line-height:1.5;">
              <p>If you did not request this password change, please contact our support team immediately.</p>
              <p style="margin-top:20px;">Best Regards,<br><strong>${CONFIG.COMPANY_NAME} Team</strong></p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>
</body>
</html>
`;
};
