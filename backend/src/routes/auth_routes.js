const express = require('express')
const {login} = require("../controllers/auth_controller")

const router = express.Router()

router.post('/',login)

module.exports = router