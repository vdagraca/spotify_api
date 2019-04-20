const express = require('express')
const bodyParser = require('body-parser')
const playlistsRouter = require('./playlists/routes')
const songRouter = require('./songs/routes')
const authenticationRouter = require('./auth/routes')
const userRouter = require('./users/routes')

const app = express()
const port = process.env.PORT || 4000

app
    .use(bodyParser.json())
    .use(playlistsRouter)
    .use(songRouter)
    .use(authenticationRouter)
    .use(userRouter)
    .listen(port, () => console.log(`Listening on port ${port}`))

