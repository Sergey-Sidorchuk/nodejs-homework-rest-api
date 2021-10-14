const express = require('express')

const { controllerWrapper, validator } = require('../../middelwares')
const { auth: ctrl } = require('../../controllers')
const { joiSchema } = require('../../schemas/users')

const router = express.Router()

router.post('/signup', validator(joiSchema), controllerWrapper(ctrl.register))

router.post('/login', controllerWrapper(ctrl.login))

router.get('logout', controllerWrapper(ctrl.logout))


module.exports = router

