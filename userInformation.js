const userModel = require('./schemas/user')
const bycrypt = require("bcrypt")

const addUserToDatabase = async (req, res) => {
  console.log("Request body:", req.body)

  const userName = req.body.userName
  const password = req.body.password

  const hashedPassword = await bycrypt.hash(password, 10)

  const userCreds = new userModel({
    userName,
    password: hashedPassword
  })

  console.log(`user creds? : `, userCreds)

  const results = await userCreds.save()

  res.json(results)
}


const checkUserCredentials = async (userName, password) => {
  console.log("Username? ", userName, password)

  const results = await userModel.findOne({
    userName
  })

  if (results === null || results === undefined ) {
    return false
  }

  console.log("Results", results)

  const comparisonBool = await bycrypt.compare(password, results.password)

  return comparisonBool  
}

const checkUserExists = async userName => {
  const results = await userModel.findOne({
    userName
  })

  if (results === null || results === undefined) {
    return false
  }

  console.log("Results", results)

  return true

}

module.exports = { 
  addUserToDatabase,
  checkUserCredentials,
  checkUserExists
} 