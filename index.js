const http = require("http")
const express = require("express")

const app = express()

app.use((req, res) => {

  const method = req.method
  const route = req.url

  if (route === "/" && method === "GET") {
    const someObject = {
      hi: "there",
      whats: "up",
    }

    res.send(someObject)
  }


  res.end("The method request was " + method + " and the route was " + route)
})

const port = 3535
app.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))

