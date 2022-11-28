const express = request('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require("dotenv").config();
// local import
const app = express()
const PORT = process.env.PORT || 5000

app.use(cookieParser())
app.use(bodyParser.json())

app.listen(PORT, () => {
  console.log(`App listening at ${PORT}`)
})