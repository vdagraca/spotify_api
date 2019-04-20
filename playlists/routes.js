const { Router } = require('express')
const Playlist = require('./model')
const auth = require('../auth/middleware')
const Song = require('../songs/model')

const router = new Router()

router.post('/playlists', auth, (req, res, next) => {
    Playlist
        .create(req.body)
        .then(playlists => {
            if (!playlists) {
                return res.status(404).send({
                    message: `Playlists does not exist`
                })
            }
            return res.status(201).send(playlists)
        })
        .catch(error => next(error))
})

router.get('/playlists', auth, (req, res, next) => {
    Playlist
        .findAll()
        .then(playlists => {
            res.json({ playlists: playlists })
        })
        .catch(err => {
            res.status(500).json({
                message: 'Something went wrong',
                error: err
            })
        })
})

router.get('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id, { include: [Song] })
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return res.send(playlist)
        })
        .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return playlist.destroy()
                .then(() => res.status(204).send())
        })
        .catch(error => next(error))
})


module.exports = router