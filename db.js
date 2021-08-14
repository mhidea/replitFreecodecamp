const mongoose = require('mongoose')
const { MongoClient } = require('mongodb');


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mqfkn.mongodb.net/urlDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(e => {
    console.log('db connected');
}).catch(e => {
    console.log("db not connected")
});

const { Schema } = mongoose;
//url model
const urlSchema = new Schema({
    url: String,
    short: Number,
});
const urlModel = mongoose.model('url', urlSchema);


exports = { urlModel }