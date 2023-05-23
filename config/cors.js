const cors = require('cors');

const whitelist = ['http://localhost:3000'];

const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

module.exports = cors(corsOptions);