const express = require('express')
const storage = require('./multerConfig')
const multer = require('multer')

const csv = require('csv');
// Permite interagir com o sistema de arquivos
const fs = require('fs');
// Incluir o módulo para gerenciar diretórios e caminhos
const path = require('path');

const app = express()

app.use("/files", express.static("uploads"))
const upload = multer({storage: storage})


app.post('/upload', upload.single('file') ,(req, res) => {

    //return res.json(req.file.filename)

    const arquivoImportado = './uploads/' + req.file.filename

    fs.createReadStream(arquivoImportado)
    .pipe(csv.parse({ columns: true, delimiter: ';' }))
    .on('data', (data) => {
        console.log(data); // Aqui você imprime cada linha do arquivo
    })
    .on('end', () => {
        console.log('Leitura do arquivo finalizada.');
        res.send('Arquivo importado e processado com sucesso.');
    });




})

app.listen(3000, ()=>{
    console.log('servidor rodando')
})