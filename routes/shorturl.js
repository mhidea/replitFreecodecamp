const { app } = require('../app')

app.get("/short", function (req, res) {
    return res.send("shorten")
})
