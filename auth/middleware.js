const User = require('../users/model')
const { toData } = require('./jwt')

function auth(req, res, next) {
    const auth = req.headers.authorization && req.headers.authorization.split(' ')
    if (auth && auth[0] === 'Bearer' && auth[1]) {
        try {
            const data = toData(auth[1])
            User
                .findByPk(data.userId)
                .then(user => {
                    if (!user) return next('User does not exist')

                    req.user = user
                    next()
                })
                .catch(next)
        }
        catch (error) {
            res.status(400).send({
                message: `Error ${error.name}: ${error.message}`,
            })
        }
    }
    else {
        res.status(404).send({
            message: 'Resource does not exist or not authenticated to acces resource.'
        })
    }
}

module.exports = auth