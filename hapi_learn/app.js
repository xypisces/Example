const Hapi = require('hapi')
const config = require('./config/index')
const routeApi = require('./routes/index')

const server = new Hapi.Server()

server.connection({
  port: config.port,
  host: config.host,
})

const init = async () => {
  server.route(routeApi)
  await server.start()
  console.log(`server is running at ${server.info.uri}`)
}

init()