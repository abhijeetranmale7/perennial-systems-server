const helmet = require('helmet');

const helmetMiddleware = helmet({
    crossOriginResourcePolicy: false,
});

module.exports = helmetMiddleware;