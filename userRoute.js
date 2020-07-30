const express = require("express")
const bodyParser = require("body-parser")
const userModel = require('./schemas/user')

const addUserToDatabase = async (req, res) => {
    console.log("Request body:", req.body)

    const userName = req.body.userName
    const password = req.body.password

    const userCreds = new userModel({
      userName,
      password
    })

    console.log(`user creds? : `, userCreds)
    
    const results = await userCreds.save()

    res.json(results)
}

const userRouter = express.Router()




userRouter.route('/add').post( bodyParser.json(), addUserToDatabase) 

module.exports = userRouter

