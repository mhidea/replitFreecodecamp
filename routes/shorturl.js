const { app } = require('../app')
const { urlModel } = require('../db')
const dns = require('dns')

app.post("/api/shorturl/:shorturl?", function (req, res) {
    if (req.params.shorturl != undefined) {
        urlModel.findOne({ _id: req.params.shorturl }, function (err, doc) {
            if (err || !doc) {
                return res.json({ error: 'invalid url' })
            } else {
                res.redirect(doc.url)
            }
        });
    } else {
        dns.lookup(req.body.URL, function (err, address, family) {
            if (err) {
                return res.json({ error: 'invalid url' })
            } else {
                urlModel.findOne({ url: req.body.URL }, function (err, doc) {
                    if (err || !doc) {
                        urlModel.create({ url: req.body.URL }, function (err, model) {
                            if (err) {
                                console.log('model not saved');
                            } else {
                                return res.json({ original_url: req.body.URL, short_url: model._id })
                            }
                        });
                    } else {
                        return res.json({ original_url: req.body.URL, short_url: doc._id })
                    }
                });
            }
        })

    }


})
