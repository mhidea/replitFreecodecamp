const { now } = require('mongoose');
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
            return res.send("ERROR MODEL NOT FOUND");
        }
        else {
            doc.log.push({ ...req.body })
            let user = { "_id": doc._id, username: doc.username }
            doc.save().then(result => {
                let last = result.log.pop()
                return res.json({ ...user, date: last.date.toDateString(), duration: last.duration, description: last.description })
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
            let logs = []
            if (req.query.to || req.query.from || req.query.limit) {
                let limit = req.query.limit
                let low = req.query.from ? (new Date(req.query.from)).getTime() : 0
                let high = req.query.to ? (new Date(req.query.to)).getTime() : Infinity
                logs = doc.log.filter(el => {
                    if (limit <= 0) {
                        return false
                    }
                    limit--
                    let elDate = (new Date(el.date)).getTime()
                    return (elDate > low && elDate < high)
                })
            } else (
                logs = doc.log
            )
            return res.json({
                "_id": doc._id, username: doc.username,
                count: logs.length,
                log: logs.map(el => {
                    return { date: el.date.toDateString(), duration: el.duration, description: el.description }
                })
            });
        }
    });
})
