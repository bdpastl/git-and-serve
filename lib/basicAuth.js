const {
  checkUserCredentials
} = require("../userInformation")

const basicAuth = async (req, res, next) => {

  const requestHeader = req.headers.authorization

  if (requestHeader === undefined) {
    res.status(401).json({error: "User credientials not supplied"})
  }
  console.log('request header = ', requestHeader)
  const [ type, payload ] = requestHeader.split(" ")
  console.log("types", type)
  console.log("payload" , payload)

  if (type === 'Basic') {
    const credentials = Buffer.from(payload, 'base64').toString('ASCII')
    console.log("Credentials", credentials)
    
    const [username, password] = credentials.split(':')

    const userHasCredentials = await checkUserCredentials(username, password)

    console.log('USER CREDs? ', userHasCredentials)
    if (userHasCredentials) {

      console.log("What a neat login! ")
      next()

      return
    }

    res.status(401).json({
      error: "Bad Credentials"
    })

    return
  }

  res.status(401).json({
    error: "Wrong userpass method"
  })


}

module.exports = basicAuth