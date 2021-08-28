const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
var autoIncrement = require('mongoose-auto-increment');


const uri = `mongodb+srv://${process.env['DB_USER']}:${process.env['DB_PASSWORD']}@cluster0.mqfkn.mongodb.net/urlDatabase?retryWrites=true&w=majority`;

var connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(e => {
    console.log('db connected');

}).catch(e => {
    console.log("db not connected")
});


autoIncrement.initialize(mongoose, {
    startAt: 1
});

const { Schema } = mongoose;
//url model
const urlSchema = new Schema({
    url: String
});

urlSchema.plugin(autoIncrement.plugin, 'url');
const urlModel = mongoose.model('url', urlSchema);
exports.urlModel = urlModel



const userSchema = new Schema({
    username: String
});
// userSchema.plugin(autoIncrement.plugin, 'user');
const userModel = mongoose.model('user', userSchema);
exports.userModel = userModel


const userLogSchema = new Schema({
    description: String,
    duration: String,
    date: { type: Date, default: Date.now },
});
const userLogModel = mongoose.model('user_log', userLogSchema);
exports.userLogModel = userLogModel