
const { app } = require('../app')
const multer = require('multer')
const upload = multer({ dest: '../public/uploads/' })

app.get("/", function (req, res) {
    return res.sendFile(__dirname.replace('routes', '') + "views/metaform.html")
})

app.post('/api/fileanalyse', upload.single('upfile'), function (req, res) {
    return res.json({ name: req.file.originalname, size: req.file.size, type: req.file.mimetype })
})


