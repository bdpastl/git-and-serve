const http = require("http")
const express = require("express")

const app = express()

const homeResponse = (req,res) => {
  res.json({
    hi: "there",
    whats: "up",
  })
}

const bestTvShow = (req, res) => {
  res.send("Parks and Rec")
}

const absurdTvShow = (req, res) => {
  res.send("The Order")
}

const fourOhFour = (req, res) => {
  res.status(404)
  res.send("Four Oh Four :( ")
}

const routes = {
  'GET /': homeResponse,
  'GET /bestTv': bestTvShow,
  'GET /absurdTv': absurdTvShow
}



app.use((req, res) => {
  const routeKey = req.method+ ' ' + req.url
  const desiredRouteFunction = routes[routeKey]
  
  if (desiredRouteFunction !== undefined) {
    desiredRouteFunction(req, res)
  } else {
    fourOhFour(req, res)
  }
})

const port = 3535
app.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))

