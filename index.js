const express = require("express")
const mongoose = require("mongoose")
const userRoute = require('./userRoute')
const billRoute = require('./billRoute')
const tokenAuth = require('./lib/tokenAuth')
const basicAuth = require('./lib/basicAuth')
const userTokenRoute = require('./userToken')
const cors = require("cors")
const morgan = require('morgan')

const mongoDefaultURL = "mongodb://127.0.0.1:27017/airport"

mongoose.connect(mongoDefaultURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

const dbConnection = mongoose.connection
dbConnection.on("error", err => console.error(err))
dbConnection.once("open", () => console.log('connected to db!!! 🍕'))

const app = express()

app.use(cors())
app.use("/user", morgan(), userRoute)
app.use("/token", basicAuth,  userTokenRoute)
app.use("/bill", tokenAuth, billRoute)

const port = 3535
app.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))