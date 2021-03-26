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

const turmaSchema = new connection.Schema({
    nome_turma : String,
    curso : String,
    data_inicio : Date,
    alunos : [{ nome_aluno : String, data_matricula : Date}]
})

const turmaModel = connection.model('turmas', turmaSchema)

router.get('/alunos/:id', (req, res) => {
    var resposta = {}
    var id = req.params.id
    alunoModel.findById(id, (erro, resultado) => {
        if(erro){
            resposta.status = 'Erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao capturar aluno',
            res.status(400).send(resposta)
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
            res.status(400).send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao inserir aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })
})

router.delete('/alunos/:id', async (req, res) => {
    var resposta = {}
    var id = req.params.id
    alunoModel.deleteOne({_id : id}, async (erro, resultado) => {
        if(erro){
            resposta.status = 'erro',
            resposta.dados = erro,
            resposta.mensagem = 'Erro ao deletar aluno',
            res.status(400).send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao deletar aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })

    var turmas = await turmaModel.delete({"alunos._id" : `${id}`})
    console.log(turmas)
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
            res.status(400).send(resposta)
        } else {
            resposta.status = 'OK',
            resposta.dados = resultado,
            resposta.mensagem = 'Sucesso ao atualizar aluno',
            resposta.alunos = await alunoModel.find();
            res.send(resposta)
        }
    })
})

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



router.get('/', (req, res) => {
    res.send('Trabalho Final - Desenvolvimento Web')
})

module.exports = router;