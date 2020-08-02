const express = require("express")
const mongoose = require("mongoose")
const userRoute = require('./userRoute')
const billRoute = require('./billRoute')
const tokenAuth = require('./lib/tokenAuth')
const basicAuth = require('./lib/basicAuth')
const userTokenRoute = require('./userToken')

const mongoDefaultURL = "mongodb://127.0.0.1:27017/airport"

mongoose.connect(mongoDefaultURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

const dbConnection = mongoose.connection
dbConnection.on("error", err => console.error(err))
dbConnection.once("open", () => console.log('connected to db!!! 🍕'))

const app = express()

const goofyLoggingMiddleware = ( req, res, next) => {
  console.log("I'm a logger! ")
  console.log("Your request headers are: ", req.headers)
  console.log("Your request method was: ", req.method)

  next()
}


app.use("/user", goofyLoggingMiddleware , userRoute)
app.use("/token", basicAuth,  userTokenRoute)
app.use("/bill", tokenAuth, billRoute)

const port = 3535
app.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))