const http = require("http")


const server = http.createServer( (req, res) => { 

  const method = req.method
  const route = req.url


  res.end("The method request was " + method + " and the route was " + route)
})

const port = 3535
server.listen(port, console.log(`Now listening on port ${port}: 🚢⛴🛳`))

