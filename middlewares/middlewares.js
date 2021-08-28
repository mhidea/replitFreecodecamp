
const bodyParser = require('body-parser')
const express = require('express')
const { app } = require('../app')
const cors = require('cors');
app.use(cors());

app.use(express.static(__dirname.replace('middlewares', '') + "/public"))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())



