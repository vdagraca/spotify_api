const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()

router.post('/users', (req, res, next) => {

    if (req.body.password !== req.body.password_confirmation) {

        return res.status(422).send({
            message: 'Confirmed password incorrect'
        })
    }

    User
        .create(
            {
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            }
        )
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: `User does not exist`
                })
            }
            return res.status(201).send(user)
        })
        .catch(error => next(error))



})

module.exports = router