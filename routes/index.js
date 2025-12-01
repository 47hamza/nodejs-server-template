const test = require("./test");
const auth = require("./auth");

module.exports = function (server) {
    server.use(test);
    server.use('/api/auth', auth)
};
