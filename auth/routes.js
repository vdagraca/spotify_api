const { Router } = require('express')
const { toJWT } = require('./jwt')
const User = require('../users/model')
const bcrypt = require('bcrypt')
const router = new Router()

router.post('/tokens', (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(422).send({
            message: `'Please supply a valid email and password'`
        })
    } else {

        User
            .findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(entity => {
                if (!entity) {
                    res.status(404).send({
                        message: 'User with that email does not exist'
                    })
                }
                if (bcrypt.compareSync(req.body.password, entity.password)
                ) {
                    res.send({
                        jwt: toJWT({ userId: entity.id })
                    })
                }
                else {
                    res.status(422).send({
                        message: 'Password was incorrect'
                    })
                }
            })
            .catch(err => {
                console.error(err)
                res.status(500).send({
                    message: 'Something went wrong'
                })
            })
    }

})

module.exports = router


