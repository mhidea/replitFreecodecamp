const { app } = require('../app')
const { userModel, userLogModel } = require('../db')

app.post('/api/users', function (req, res) {
    if (!req.body.username) {
        return res.json({ error: "no username" })
    }
    userModel.findOne({ username: req.body.username }, function (err1, doc) {
        if (err1 || !doc) {
            console.log('model not found');
            userModel.create({ username: req.body.username }, function (err2, model) {
                if (err2) {
                    console.log('model not saved');
                } else {
                    return res.json({ username: model.username, _id: model._id })
                }
            })
        } else {
            return res.json({ username: doc.username, _id: doc._id })
        }
    });


})