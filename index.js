require('dotenv').config()
const express = require('express')
const massive = require('massive')

const app = express()
const pc = require('./products_controller')

const { SERVER_PORT, CONNECTION_STRING } = process.env

app.use(express.json())

massive(CONNECTION_STRING).then((db) => {
    app.set('db', db)
    console.log('DB set!')
})
.catch(err => console.log(err))

app.get('/api/products', pc.getAll)
app.get('/api/products/:id', pc.getOne)
app.put('/api/products/:id', pc.update)
app.post('/api/products', pc.create)
app.delete('/api/products/:id', pc.delete)



app.listen(SERVER_PORT, () => {
    console.log(`Listening on server ${SERVER_PORT}`)
})