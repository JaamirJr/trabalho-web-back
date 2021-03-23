const express = require('express')
const router = express.Router()
const connection = require('../config/mongoDB')

const alunosSchema = new connection.Schema({
    nome_aluno : String,
    data_matricula : Date
})

const turmaSchema = new connection.Schema({
    nome_turma : String,
    curso : String,
    data_inicio : Date,
    alunos : [{ nome_aluno : String, data_matricula : Date}]
})

const turmaModel = connection.model('turmas', turmaSchema)

router.get('/turmas', (req, res) => {
    var resposta = {}
    turmaModel.find((erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao capturar turmas',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao capturar turmas',
            res.send(resposta)
        }
    })
})

router.get('/turmas/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    turmaModel.findById({_id : id}, (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao capturar turma',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao capturar turma',
            res.send(resposta)
        }
    })
})

router.post('/turmas', (req, res) => {
    var resposta = {}
    var dados = {
        nome_turma : req.body.nome_turma,
        curso : req.body.curso,
        data_inicio : req.body.data_inicio,
        alunos : req.body.alunos
    }
    turmaModel.insertMany(dados, async (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao inserir turma',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao inserir turma',
            resposta.turmas = await turmaModel.find();
            res.send(resposta)
        }
    })
})

router.delete('/turmas/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    turmaModel.deleteOne({_id : id}, async (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao deletar turma',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao deletar turma',
            resposta.turmas = await turmaModel.find()
            res.send(resposta)
        }
    })
})

router.patch('/turmas/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    var dados = {
        nome_turma : req.body.nome_turma,
        curso : req.body.curso,
        data_inicio : req.body.data_inicio,
        alunos : req.body.alunos
    }
    turmaModel.updateMany({_id : id}, dados, async (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao deletar turma',
            res.send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao deletar turma',
            resposta.turmas = await turmaModel.find()
            res.send(resposta)
        }
    })
})

module.exports = router