const jsonWebToken = require('jsonwebtoken')
const { checkUserExists } = require('../userInformation')

const tokenSignature = "gitAndServeBackend"

const tokenAuth = async (req, res, next) => {
  const requestHeader = req.headers.authorization

  if (requestHeader === undefined || requestHeader === null) {
        res.status(401).json({
          error: "User credientials not supplied"
        })
  }

  const [ type, payload ] = requestHeader.split(" ")

  if (type === "Bearer") {
    try {
      const verification = jsonWebToken.verify(payload, tokenSignature)

      console.log("Verification: ", verification)

      const userExists = await checkUserExists(verification.userName)

      if (userExists === true) {
        next()
        return
      }

      res.status(401).json({
        error: "Unauthorized. Bad Token!"
      })
      return
    } catch (error) {
      res.status(401).json( {error: "Bad Credentials"} )
    }
  }




  res.status(401).json({error: "Unauthorized. Bad Token!"})
}


module.exports = tokenAuth