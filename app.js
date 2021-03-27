const express = require('express')
const cors = require('cors')
const app = express()
const routes = require('./routes')

const corsOptions = {
    origin: 'http://localhost:3000',
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use(routes)


app.listen((process.env.PORT || 3000), () => {
    console.log(`Escutando em http://localhost:${port}`)
})