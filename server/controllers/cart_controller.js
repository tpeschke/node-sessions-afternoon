const swag = require('../models/swag')

module.exports = {

    add: (res, req, next) => {

        const { id } = req.query;
        let { cart } = req.session.user;

        const index = cart.findIndex(swag => swag.id == id);

        if (index === -1) {
            const selectedSwag = swag.find(swag => swag.id == id);

            cart.push(selectedSwag);
            req.session.user.total += selectedSwag.price;
        }

        res.status(200).send(req.session.user)
    },


    delete: (res, req, next) => {

        const { id } = req.query;
        let { cart } = req.session.user;

        const selectedSwag = swag.find(swag => swag.id == id)

        if (selectedSwag) {

            const index = cart.findIndex(swag => swag.id == id);

            cart.splice(index, 1);

            req.session.user.total -= selectedSwag.price;
        }

        res.status(200).send(req.session.user)
    },


    checkout: (res, req, next) => {

        const { id } = req.query;
        let { cart, total } = req.session.user;

        cart = []
        total = 0

        res.status(200).send(req.session.user)

    }
}