const express = require("express")
const bodyParser = require("body-parser")
const {
  addUserToDatabase,
} = require("./userInformation")


const defaultUser = (req, res) => {
  res.json({ information: "this is a route for creating a user" })
}


const userRouter = express.Router()

userRouter.route('/add').post( bodyParser.json(), addUserToDatabase) 
userRouter.route('/').get(defaultUser)

module.exports = userRouter

