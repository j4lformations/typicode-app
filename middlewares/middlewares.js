const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {
    // morgan
    if (process.env.MORGAN_MODE === 'dev') {
        app.use(morgan(process.env.MORGAN_MODE))
    }
    // body-parser
    app.use(bodyParser.json());
}