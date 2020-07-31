const mongoose = require("mongoose")

const billSchema = mongoose.Schema({
  associatedUser: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true
  },
  bill: {
    type: String,
    required: true
  }
})

const model = mongoose.model("bills", billSchema)

module.exports = model