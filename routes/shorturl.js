const { app } = require('../app')
const { urlModel } = require('../db')
const dns = require('dns')




app.post("/api/shorturl/:shorturl?", function (req, res) {
    if (req.params.shorturl != undefined) {
        urlModel.findOne({ _id: req.params.shorturl }, function (err, doc) {
            if (err || !doc) {
                return res.json({ error: 'invalid url' })
            } else {
                res.redirect("http://" + doc.url)
            }
        });
    } else {
        let url = req.body.url
        url = url.replace("https://", "")
        url = url.replace("http://", "")
        dns.lookup(url, function (err, address, family) {
            if (err) {
                return res.json({ error: 'invalid url' })
            }
            else {
                console.log('dns ok.');
                urlModel.findOne({ url: url }, function (err1, doc) {
                    if (err1 || !doc) {
                        console.log('model not found');
                        urlModel.create({ url: url }, function (err2, model) {
                            if (err2) {
                                console.log('model not saved');
                            } else {
                                return res.json({ original_url: url, short_url: model._id })
                            }
                        });
                    } else {
                        return res.json({ original_url: url, short_url: doc._id })
                    }
                });
            }
        })
    }


})
