const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');
var autoIncrement = require('mongoose-auto-increment');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mqfkn.mongodb.net/urlDatabase?retryWrites=true&w=majority`;

var connection = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(e => {
    console.log('db connected');

}).catch(e => {
    console.log("db not connected")
});


autoIncrement.initialize(mongoose);

const { Schema } = mongoose;
//url model
const urlSchema = new Schema({
    url: String
});
urlSchema.plugin(autoIncrement.plugin, 'url');
const urlModel = mongoose.model('url', urlSchema);
exports.urlModel = urlModel
