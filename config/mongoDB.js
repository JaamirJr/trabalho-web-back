const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://deploy:jamir@cluster0.x2ssw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/trabalho_final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose