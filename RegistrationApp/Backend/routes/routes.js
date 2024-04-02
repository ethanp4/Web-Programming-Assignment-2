const express = require('express')
const router = express.Router()
const { submitForm } = require('../controllers/controller')

router.post('/submitForm', submitForm)

module.exports = router