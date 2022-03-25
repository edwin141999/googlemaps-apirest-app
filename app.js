const express = require('express')
const path = require('path')
const cors = require('cors')

const app = express()
const port = 5000

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(cors())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
})

app.listen(port, () => {
    console.log('Sever port:', port);
})

module.exports = app
