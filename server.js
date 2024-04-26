const express = require('express')
const storage = require('./multerConfig')
const multer = require('multer')
const csv = require('csv')
const fs = require('fs')
const path = require('path')
const { PrismaClient } = require('@prisma/client')

const app = express()
const prisma = new PrismaClient()


app.use("/files", express.static("uploads"))
const upload = multer({storage: storage})


app.post('/upload', upload.single('file') ,(req, res) => {

    //return res.json(req.file.filename)

    const arquivoImportado = './uploads/' + req.file.filename

    fs.createReadStream(arquivoImportado)
    .pipe(csv.parse({ columns: true, delimiter: ';' }))
    .on('data', async (data) => {

        const dadosTratados = {
            codigo: data.codigo,
            filial: data.filial,
            forecast: parseFloat(Number.parseFloat(data.forecast).toFixed(2)),
            estoque_in_house: parseInt(data.estoque_in_house),
            estoque_livre: parseInt(data.estoque_livre),
            compras: parseInt(data.compras),
            transferencias: parseInt(data.transferencias),
            politica: parseInt(data.politica),
            base_NS: data.base_NS,
            ns: parseFloat(Number.parseFloat(data.ns).toFixed(2)),
            ns_ex_bo_total: parseFloat(Number.parseFloat(data.ns_ex_bo_total).toFixed(2)),
            ns_ex_bo_ttl_parc: parseFloat(Number.parseFloat(data.ns_ex_bo_ttl_parc).toFixed(2))
        };

        await prisma.Saldo.create({
            data: dadosTratados
        });

    })
    .on('end', () => {
        console.log('Leitura do arquivo finalizada.');
        res.send('Arquivo importado e processado com sucesso.');
    });

})

app.get('/excluir-todos-os-dados', async (req, res) => {
    try {
        await prisma.Saldo.deleteMany();

        console.log('Todos os dados foram excluídos com sucesso.');

        res.send('Todos os dados foram excluídos com sucesso.');
    } catch (error) {
        console.error('Ocorreu um erro ao excluir todos os dados:', error);
        // Envie uma resposta de erro
        res.status(500).send('Ocorreu um erro ao excluir todos os dados.');
    }
});



app.listen(3000, ()=>{
    console.log('servidor rodando')
})