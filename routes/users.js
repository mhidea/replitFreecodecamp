const { app } = require('../app')
const { userModel } = require('../db')


app.get('/api/users', function (req, res) {
    userModel.find({}, function (err, result) {
        if (err) {
            return res.send("ERROR");
        }
        return res.json(result)
    });

})

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
app.post('/api/users/:id/exercises', function (req, res) {
    if (!req.body.description || !req.body.duration) {
        return res.send("Requires not provided");
    }
    userModel.findOne({ _id: req.params.id }, function (err1, doc) {
        if (err1 || !doc) {
            return res.send("ERROR");
        }
        else {
            doc.log.push({ ...req.body })
            console.log(doc);
            doc.save().then(result => {
                return res.json(result)

            });
        }
    });
})

app.get('/api/users/:id/logs', function (req, res) {
    userModel.findOne({ _id: req.params.id }, function (err1, doc) {
        if (err1 || !doc) {
            return res.send("ERROR");
        }
        else {

            return res.json({ _id: doc._id, username: doc.username, log: doc.log, count: doc.log.length })
        }
    });
})