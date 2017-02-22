exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://test:test@ds041556.mlab.com:41556/launch-committees';
exports.PORT = process.env.PORT || 8080;
