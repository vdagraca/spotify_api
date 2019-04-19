const express = require('express')
const bodyParser = require('body-parser')
// const customersRouter = require('./customers/routes')

const app = express()
const port = process.env.PORT || 4001

app
    .use(bodyParser.json())
    // .use(customersRouter)
    .listen(port, () => console.log(`Listening on port ${port}`))