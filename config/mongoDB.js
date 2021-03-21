const mongoose = require('mongoose')

mongoose.connect('mongodb://ec2-18-230-88-182.sa-east-1.compute.amazonaws.com/trabalho_final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose