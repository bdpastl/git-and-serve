const express = require('express')
const bodyParser = require('body-parser')
const {
  checkUserCredentials
} = require("./userInformation")
jsonWebToken = require('jsonwebtoken')

const tokenSignature = "gitAndServeBackend"

const createToken = (userName) => {
  const token = jsonWebToken.sign(
    { userName }, 
    tokenSignature,
    { expiresIn: "2h" }
  )

  return token
}

const getUserToken = (req, res) => {

  const { userName, password } = req.body

  if (checkUserCredentials(userName, password)) {
    const token = createToken(userName)

    res.json({
      token
    })
  }


}




const getUserTokenRoute = express.Router()

getUserTokenRoute.post('/', bodyParser.json(), getUserToken)

module.exports = getUserTokenRoute