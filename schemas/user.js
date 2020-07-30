const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true, 
    unique: true
  }, 
  password: {
    type: String, 
    required: true
  }
})

const model = mongoose.model("userCredentials", userSchema)

module.exports = model