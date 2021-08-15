
const bodyParser = require('body-parser')
const express = require('express')
const { app } = require('../app')

app.use(express.static(__dirname.replace('middlewares', '') + "/public"))
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())



