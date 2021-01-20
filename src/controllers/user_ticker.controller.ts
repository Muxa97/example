import { FastifyReply, FastifyRequest } from 'fastify'
import * as UserTickerService from '../services/user_ticker.service'
import * as TickerService from '../services/ticker.service'
import { UserTickerAttributesCreation } from '../types/user_ticker'

async function create (req: FastifyRequest, reply: FastifyReply) {
  const body: UserTickerAttributesCreation = (req.body as UserTickerAttributesCreation)

  try {
    const user = await UserTickerService.create(body)

    reply.send(user)
  } catch (error) {
    reply.send(error)
  }
}

async function createMany (req: FastifyRequest, reply: FastifyReply) {
  const body = req.body as {
        userId: string,
        coins: Array<{ address: string, ticker: string }>
    }

  try {
    const userHash = body.userId
    const coins = body.coins
    const tickers = await TickerService.findByTickers(coins.map(
      (coin: { address: string, ticker: string }) => coin.ticker),
    )
    const records = await UserTickerService.createMany(coins.map(
      (coin: { address: string, ticker: string }) => {
        const ticker = tickers.find((tckr) => tckr.ticker === coin.ticker)

        return {
          userHash,
          address: coin.address,
          tickerId: ticker ? ticker.id : null,
        } as UserTickerAttributesCreation
      }),
    )

    reply.send(records)
  } catch (error) {
    reply.send(error)
  }
}

async function findByUser (req: FastifyRequest, reply: FastifyReply) {
  const userHash = (req.query as { userId: string }).userId

  try {
    const records = UserTickerService.findByUser(userHash)

    reply.send(records)
  } catch (error) {
    reply.send(error)
  }
}

async function findByTicker (req: FastifyRequest, reply: FastifyReply) {
  const { ticker } = req.query as { ticker: string }

  try {
    const records = UserTickerService.findByTicker(ticker)

    reply.send(records)
  } catch (error) {
    reply.send(error)
  }
}

async function remove (req: FastifyRequest, reply: FastifyReply) {
  reply.send(null)
}

export {
  create,
  createMany,
  findByUser,
  findByTicker,
  remove,
}
