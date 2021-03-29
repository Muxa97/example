import { FastifyInstance } from 'fastify'
import * as UserController from '../controllers/user.controller'

const users = (fastify: FastifyInstance, opts: any, next: (err?: Error) => void) => {
  fastify.post('/users', UserController.create)
  fastify.get('/users/addresses', UserController.findAddresses)
  fastify.get('/users/coins', UserController.findCoins)
  fastify.delete('/users', UserController.remove)
  next()
}

export default users
