const express = require('express')
const router = express.Router()
const { submitForm } = require('../controllers/controller')

router.get('/', (req, res) => {
  res.redirect('./Frontend/index.html')
})

router.post('/submitForm', submitForm)

module.exports = router