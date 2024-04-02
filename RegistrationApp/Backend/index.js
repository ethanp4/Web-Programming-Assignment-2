const express = require('express')
const app = express()
const routes = require('./routes/routes')

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
})

app.use(express.urlencoded({ extended: false }))

app.use(express.json())
app.use(routes)
app.listen(7000, () => {
  console.log('Server is running')
})