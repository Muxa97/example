import fastify from 'fastify'
import tickerRoutes from './routes/ticker.routes'
import usersRoutes from './routes/user.routes'
import { PORT } from './config'
import { logger } from './logger'

const server = fastify()

server.register(tickerRoutes)
server.register(usersRoutes)

server.listen(PORT, (err, address) => {
  if (err) {
    logger.log({
      level: 'error',
      module: 'user.controller findAddresses',
      ...err,
    })
    throw err
  }
  logger.info(`Server listening at ${address}`)
})
