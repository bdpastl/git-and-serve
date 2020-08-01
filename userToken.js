const express = require('express')
const bodyParser = require('body-parser')
const jsonWebToken = require('jsonwebtoken')

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

  const { userName } = req.body
  const token = createToken(userName)

  res.json({
    token
  })
}




const getUserTokenRoute = express.Router()

getUserTokenRoute.post('/', bodyParser.json(), getUserToken)

module.exports = getUserTokenRoute