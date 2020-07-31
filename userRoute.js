const express = require("express")
const bodyParser = require("body-parser")
const {
  addUserToDatabase,
} = require("./userInformation")


const userRouter = express.Router()

userRouter.route('/add').post( bodyParser.json(), addUserToDatabase) 

module.exports = userRouter

