const express = require('express')
const http    = require('http')
const multer  = require('multer')

var storage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, `uploads/${file.fieldname}/`),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}.${file.fieldname}.${file.originalname}`)
})
const upload  = multer({ storage: storage })
const app     = express()

app.get('/', (req, res) => res.send('Server is running.'))

app.post('/profile', upload.single('avatar'), (req, res, next) => {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  return res.send({
    code: 200,
    message: 'upload success',
    file: req.file
  })
})

app.post('/photos/upload', upload.array('photos', 12), (req, res, next) => {
  // req.files is array of `photos` files
  // req.body will contain the text fields, if there were any
  console.log(req.files)
  console.log(req.body)

  // setTimeout(() => {
    res.send({
      code: 200,
      message: 'upload success',
      files: req.files
    })
  // }, 3000)
})

// var cpUpload = upload.fields([
//   { name: 'avatar', maxCount: 1 },
//   { name: 'gallery', maxCount: 8 }
// ])
// app.post('/cool-profile', cpUpload, function (req, res, next) {
//   // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
//   //
//   // e.g.
//   //  req.files['avatar'][0] -> File
//   //  req.files['gallery'] -> Array
//   //
//   // req.body will contain the text fields, if there were any
// })

http.createServer(app).listen(3003, function() {
  console.log('Express server listening on port 3003');
})
