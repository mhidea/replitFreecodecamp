const { app } = require('../app')
const { urlModel } = require('../db')
const dns = require('dns')

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}


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
        if (validURL(req.body.URL)) {
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
        } else {
            return res.json({ error: 'invalid url' })
        }
    }


})
