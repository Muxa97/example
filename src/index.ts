import fastify from 'fastify'
import tickerRoutes from './routes/ticker.routes'
import usersRoutes from './routes/user.routes'
import { PORT } from './config'

const server = fastify()

server.register(tickerRoutes)
server.register(usersRoutes)

server.listen(PORT, (err, address) => {
  if (err) {
    console.error(err)
    throw err
  }
  console.log(`Server listening at ${address}`)
})
