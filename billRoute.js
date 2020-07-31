const express = require("express")
const bodyParser = require("body-parser")
const billModel = require('./schemas/bill')

const addBillToDatabase = async (req, res) => {
    console.log("Request? ", req.body)

    const associatedUser = req.body.associatedUser
    const price = req.body.price
    const bill = req.body.bill

    if (associatedUser === undefined || price === undefined ) {
        res.json({error: "bad input, please have user sent"})
    }


    const billDB = new billModel({
        associatedUser, 
        price,
        bill
    })

    const results = await billDB.save()

    res.json(results)
}


const getBillsByAssociatedUser = async (req, res) => {
    const associatedUser = req.body.associatedUser

    const results = await billModel.find({
        associatedUser
    })

    console.log(results)
    res.json(results)
}

const billRouter = express.Router()

billRouter.route('/add').post(bodyParser.json(), addBillToDatabase)
billRouter.route('/find').post(bodyParser.json(), getBillsByAssociatedUser)

module.exports = billRouter