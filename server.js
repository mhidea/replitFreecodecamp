
require('dotenv').config()
const { app } = require('./app')
var requireDir = require('require-dir');
require('./db')
var dir = requireDir('./middlewares', { extensions: ['.js'] })
var dir = requireDir('./routes', { extensions: ['.js'] })
console.log(process.env['DB_USER']);
console.log(process.env['DB_PASSWORD']);
const listener = app.listen(process.env.PORT || 3000, function () {
    console.log("Your app is listening on port " + listener.address().port);
});