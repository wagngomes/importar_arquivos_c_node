const express = require('express')
const storage = require('./multerConfig')
const multer = require('multer')

const app = express()

app.use("/files", express.static("uploads"))
const upload = multer({storage: storage})


app.post('/upload', upload.single('file') ,(req, res) => {

    return res.json(req.file.filename)

})

app.listen(3000, ()=>{
    console.log('servidor rodando')
})