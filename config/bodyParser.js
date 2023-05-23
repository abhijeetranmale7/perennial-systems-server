const bodyParser = require('body-parser');

const jsonBodyParser = bodyParser.json();

const urlEncodedBodyParser = bodyParser.urlencoded({ extended: true });

const bodyParserMiddleware = (req, res, next) => {
    jsonBodyParser(req, res, err => {
        if (err) {
            return next(err);
        }
        urlEncodedBodyParser(req, res, next);
    });
};

module.exports = bodyParserMiddleware;