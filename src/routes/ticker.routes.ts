import { FastifyInstance } from 'fastify'
import * as TickerController from '../controllers/ticker.controller'

const tickers = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/tickers', TickerController.create)
  fastify.post('/tickers/createMany', TickerController.createMany)
  fastify.delete('/tickers', TickerController.remove)
  fastify.get('/tickers', TickerController.findByUser)
  next()
}

export default tickers
