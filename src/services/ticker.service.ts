import { Op } from 'sequelize'
import models from '../models'
import { TickerInstance } from '../models/ticker'
import { TickerAttributes, TickerCreationAttributes } from '../types/ticker'
import { UserTickerInstance } from '../models/user_ticker'

const { Ticker, UserTicker } = models

async function create (attrs: TickerAttributes): Promise<TickerInstance> {
  return Ticker.create(attrs)
}

async function createMany (tickers: TickerCreationAttributes[]) {
  return Ticker.bulkCreate(tickers)
}

async function findByUser (userHash: string): Promise<TickerInstance[]> {
  if (!userHash) {
    throw new Error('User id is missing')
  }

  const userTickers: UserTickerInstance[] = (await UserTicker.findAll({
    where: {
      user_hash: userHash,
    },
  }) as UserTickerInstance[])

  if (userTickers.length === 0) {
    throw new Error('User has no tickers')
  }

  const tickerIds: number[] = userTickers.map((userTicker: UserTickerInstance) => {
    return userTicker.tickerId
  })

  return Ticker.findAll({
    where: {
      id: {
        [Op.in]: tickerIds,
      },
    },
  })
}

async function findByTickers (tickers: string[]) {
  return Ticker.findAll({
    where: {
      ticker: {
        [Op.in]: tickers,
      },
    },
  })
}

async function remove (ticker: string) {
  return Ticker.destroy({
    where: {
      ticker,
    },
  })
}

export {
  create,
  createMany,
  findByUser,
  findByTickers,
  remove,
}
