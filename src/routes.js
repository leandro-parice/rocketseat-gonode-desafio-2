const express = require('express')

const routes = express.Router()

routes.get('/', (req, res) => res.render('auth/singup'))

module.exports = routes
