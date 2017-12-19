const user = require('../models/users')

var id = 1

module.exports = {

    login: (req, res, next) => {
        if ( req.body.username === user.username && req.body.password === user.password ) {
            req.session.user.username = user.username;

            res.status(200).send(req.session.user)
        } else {
            res.status(500).send('Unauthorized')
        }
    },
    register: ( req, res, next ) => {

        var { username, password } = req.body

        user.push({
            username,
            password,
            id
        });

        id++;

        req.session.user.username = username

        res.status(200).send(req.session.user)

    },
    signout: ( req, res, next ) => {

        req.session.destroy()

        res.status(200).send( req.session )

    },
    getUser: ( req, res, next ) => {

        res.status(200).send(req.session.user)

    }

}