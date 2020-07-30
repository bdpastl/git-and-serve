const express = require("express")
const mongoose = require("mongoose")
const userRoute = require('./userRoute')

const mongoDefaultURL = "mongodb://127.0.0.1:27017/airport"

mongoose.connect(mongoDefaultURL, {
  useNewUrlParser: true, 
  useUnifiedTopology: true
})

const dbConnection = mongoose.connection
dbConnection.on("error", err => console.error(err))
dbConnection.once("open", () => console.log('connected to db!!! 🍕'))

const app = express()

app.use("/user", userRoute)

const port = 3535
app.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))