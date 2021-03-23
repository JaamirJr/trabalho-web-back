const express = require('express')
const router = express.Router()
const connection = require('../config/mongoDB')

const alunoSchema = new connection.Schema({
   nome_aluno : String,
   data_matricula : Date,
})

const alunoModel = connection.model('alunos', alunoSchema)

router.get('/alunos', (req, res) => {
    var resposta = {}
    alunoModel.find((erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao capturar alunos',
            res.status(400).send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao capturar alunos',
            res.send(resposta)
        }
    })
})

router.get('/alunos/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    alunoModel.findById(id, (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao capturar aluno',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao capturar aluno',
            res.send(resposta)
        }
    })
})

router.post('/alunos', (req, res) => {
    var resposta = {}
    let data = new Date(req.body.data_matricula)
    var dados = {
        nome_aluno : req.body.nome_aluno,
        data_matricula : data
    }
    alunoModel.insertMany(dados, async (erro, resultado) =>{
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao inserir aluno',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao inserir aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })
})

router.delete('/alunos/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    alunoModel.deleteOne({_id : id}, async (erro, resultado) => {
        if(erro){
            resposta.status = 'erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao deletar aluno',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao deletar aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })
})

router.patch('/alunos/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    var dados = {
        nome_aluno : req.body.nome_aluno,
        data_matricula : req.body.data_matricula
    }
    alunoModel.updateOne({_id : id}, dados, async (erro, resultado) =>{
        if(erro){
            resposta.status = 'erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao atualizar aluno',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao atualizar aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })
})

module.exports = router