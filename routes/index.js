const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Trabalho Final - Desenvolvimento Web')
})

module.exports = router;