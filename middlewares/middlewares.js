
const bodyParser = require('body-parser')
const express = require('express')
const { app } = require('../app')

app.use(express.static(__dirname.replace('middlewares', '') + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



