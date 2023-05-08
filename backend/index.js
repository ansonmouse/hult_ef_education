const express = require('express')
const cors = require('cors')
const data = require('./programs.json')
const app = express()
const port = 3010

app.use(cors())

app.get('/programs', (req, res) => {
    res.send(data)
  })

app.listen(port, () => {
  console.log(`Programs API listening on port ${port}`)
})