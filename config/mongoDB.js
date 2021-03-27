const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/trabalho_final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose