
const { app } = require('../app')


app.get("/", function (req, res) {
    return res.sendFile(__dirname.replace('routes', '') + "views/index.html")
})


