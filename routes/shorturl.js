const { app } = require('../app')
const { urlModel } = require('../db')
const dns = require('dns')

function isValidURL(string) {
    let ree = /(http[s]?:\/\/)(w{3}\.)?([^w{3}.]+)(\.\w+)(\/.*)?/g.exec(string)
    console.log(ree);
    console.log((ree[2] ? ree[2] : "") + ree[3] + ree[4]);
    if (ree.length > 4) {
        return (ree[2] ? ree[2] : "") + ree[3] + ree[4]
    }
    return ""
};



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
        let url = isValidURL(req.body.url)
        dns.lookup(url, function (err, address, family) {
            if (err) {
                console.log('dns NOT ok!');
                return res.json({ error: 'invalid url' })
            }
            else {
                console.log('dns ok.');
                urlModel.findOne({ url: req.body.url }, function (err1, doc) {
                    if (err1 || !doc) {
                        console.log('model not found');
                        urlModel.create({ url: req.body.url }, function (err2, model) {
                            if (err2) {
                                console.log('model not saved');
                            } else {
                                return res.json({ original_url: url, short_url: model._id })
                            }
                        });
                    } else {
                        return res.json({ original_url: req.body.url, short_url: doc._id })
                    }
                });
            }
        })
    }


})
