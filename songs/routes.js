const { Router } = require('express')
const Song = require('./model')
const auth = require('../auth/middleware')

const router = new Router()

router.post('/playlists/:id/songs', auth, (req, res, next) => {
    Song
        .create(req.body)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return res.status(201).send(song)
        })
        .catch(error => next(error))
})

router.put('/playlists/:id/songs/:id', auth, (req, res, next) => {
    Song
        .findByPk(req.params.id)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return song.update(req.body)
                .then(song => res.send(song))
        })
        .catch(error => next(error))
})

router.delete('/playlists/:id/songs/:id', auth, (req, res, next) => {
    Song
        .findByPk(req.params.id)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return song.destroy()
                .then(() => res.status(204).send())
        })
        .catch(error => next(error))
})

module.exports = router