const { app } = require('../app')
const { urlModel } = require('../db')
const dns = require('dns')

function isValidURL(string) {
    let ree = /([\w]+:\/\/)([^\/]+)(\/[^\?]*[\w\d])?(\/?.*)?/g.exec(string)
    if (!ree) {
        return false
    }
    return ree

};

app.get("/api/shorturl/:shorturl", function (req, res) {
    console.log("IN GET: " + req.params.shorturl);
    if (req.params.shorturl != undefined) {
        urlModel.findOne({ _id: req.params.shorturl }, function (err, doc) {
            if (err || !doc) {
                return res.json({ error: 'invalid url' })
            } else {
                res.redirect(doc.url)
            }
        });
    }
}
)
app.post("/api/shorturl", function (req, res) {
    console.log("IN POST: " + req.body.url);

    let url = isValidURL(req.body.url)
    if (url) {
        dns.lookup(url[2], function (err, address, family) {
            if (err) {
                console.log('dns NOT ok!');
                return res.json({ error: 'invalid url' })
            }
            else {
                console.log('dns ok.');
                let mainUrl = url[1] + url[2] + (url[3] ? url[3] : '')
                urlModel.findOne({ url: mainUrl }, function (err1, doc) {
                    if (err1 || !doc) {
                        console.log('model not found');
                        urlModel.create({ url: mainUrl }, function (err2, model) {
                            if (err2) {
                                console.log('model not saved');
                            } else {
                                return res.json({ original_url: req.body.url, short_url: model._id })
                            }
                        });
                    } else {
                        return res.json({ original_url: req.body.url, short_url: doc._id })
                    }
                });
            }
        })
    } else {
        console.log('bad url!');
        return res.json({ error: 'invalid url' })

    }




})
