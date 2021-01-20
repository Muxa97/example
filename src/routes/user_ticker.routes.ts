import { FastifyInstance } from 'fastify'
import * as UserTickerController from '../controllers/user_ticker.controller'

const users = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/users/create', UserTickerController.create)
  fastify.post('/users/createMany', UserTickerController.createMany)
  fastify.get('/users/ticker', UserTickerController.findByTicker)
  fastify.get('/users', UserTickerController.findByUser)
  fastify.delete('/users', UserTickerController.remove)
  next()
}

export default users
