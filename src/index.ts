import fastify from 'fastify'
import tickerRoutes from './routes/ticker.routes'
import usersRoutes from './routes/user_ticker.routes'

const server = fastify()

server.register(tickerRoutes)
server.register(usersRoutes)

server.listen(8080, (err, address) => {
  if (err) {
    console.error(err)
    throw err
  }
  console.log(`Server listening at ${address}`)
})
