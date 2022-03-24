const express = require('express')
const path = require('path')

const app = express()
const port = 5000

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
    console.log('Sever port:', port);
})

module.exports = app
