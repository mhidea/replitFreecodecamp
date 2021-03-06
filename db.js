const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
var autoIncrement = require('mongoose-auto-increment');


const uri = `mongodb+srv://${process.env['DB_USER']}:${process.env['DB_PASSWORD']}@cluster0.mipgo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

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

const userLogSchema = new Schema({
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now },
});

const userSchema = new Schema({
    username: String,
    log: [userLogSchema]
});
// userSchema.plugin(autoIncrement.plugin, 'user');
const userModel = mongoose.model('user', userSchema);
exports.userModel = userModel
