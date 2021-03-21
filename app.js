const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001
const routes = require('./routes')
const alunos = require('./routes/alunos')
const turmas = require('./routes/turmas')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)
app.use(alunos)
app.use(turmas)

app.listen(port, () => {
    console.log(`Escutando em http://localhost:${port}`)
})