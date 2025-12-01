const ENV = process.env.NODE_ENV

module.exports.CONFIG={
    PORT: process.env.PORT,
    ENV: ENV,
    DB_URI: ENV === "prod" ? process.env.DB_URI_PROD:process.env.DB_URI_DEV,
    DB_ENVIRONMENT: ENV === "prod" ? "LIVE":"LOCAL",
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    ENCRYPTION_KEY: process.env.ENCRYPTION_KEY,
    MAIL_SERVICE: process.env.MAIL_SERVICE,
    MAIL_HOST: process.env.MAIL_HOST,
    MAIL_USERNAME: process.env.MAIL_USERNAME,
    MAIL_PASSWORD: process.env.MAIL_PASSWORD,
}