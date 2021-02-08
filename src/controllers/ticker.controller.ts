import { FastifyReply, FastifyRequest } from 'fastify'
import * as TickerService from '../services/ticker.service'
import { TickerInstance } from '../models/ticker'
import { TickerCreationAttributes } from '../types/ticker'
import { logger } from '../logger'

async function create (req: FastifyRequest, reply: FastifyReply) {
  const body: TickerCreationAttributes = req.body as TickerCreationAttributes

  try {
    const ticker: TickerInstance = await TickerService.create(body)

    reply.send(ticker)
  } catch (error) {
    logger.log({
      level: 'error',
      module: 'ticker.controller create',
      ...error,
    })
    reply.send(error)
  }
}

async function createMany (req: FastifyRequest, reply: FastifyReply) {
  const { tickers } = req.body as { tickers: string[] }

  try {
    const records: TickerInstance[] = await TickerService.createMany(
      tickers.map((ticker) => ({ ticker } as TickerCreationAttributes)),
    )

    reply.send(records)
  } catch (error) {
    logger.log({
      level: 'error',
      module: 'ticker.controller createMany',
      ...error,
    })
    reply.send(error)
  }
}

async function remove (req: FastifyRequest, reply: FastifyReply) {
  const { ticker } = req.body as TickerCreationAttributes

  try {
    await TickerService.remove(ticker)
    reply.send({
      success: true,
    })
  } catch (error) {
    logger.log({
      level: 'error',
      module: 'ticker.controller remove',
      ...error,
    })
    reply.send(error)
  }
}

export {
  create,
  createMany,
  remove,
}
