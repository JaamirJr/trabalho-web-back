const mongoose = require('mongoose')

mongoose.connect('mongodb://ec2-18-228-117-123.sa-east-1.compute.amazonaws.com/trabalho_final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose