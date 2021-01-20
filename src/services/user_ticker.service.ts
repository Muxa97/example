import models from '../models'
import { UserTickerAttributesCreation } from '../types/user_ticker'

const { UserTicker, Ticker } = models

async function create (attrs: UserTickerAttributesCreation) {
  return UserTicker.create(attrs)
}

async function createMany (data: UserTickerAttributesCreation[]) {
  return UserTicker.bulkCreate(data)
}

async function findByUser (userId: string) {
  return UserTicker.findAll({
    where: {
      user_hash: userId,
    },
  })
}

async function findByTicker (tickerName: string) {
  const ticker = await Ticker.findOne({
    where: {
      ticker: tickerName,
    },
  })

  if (!ticker) {
    throw new Error('Invalid ticker name')
  }

  return UserTicker.findAll({
    where: {
      ticker_id: ticker.id,
    },
  })
}

async function remove (tickerName: string) {
  const ticker = await Ticker.findOne({
    where: {
      ticker: tickerName,
    },
  })

  if (!ticker) {
    throw new Error('Invalid ticker name')
  }

  return UserTicker.destroy({
    where: {
      ticker_id: ticker.id,
    },
  })
}

export {
  create,
  createMany,
  findByUser,
  findByTicker,
  remove,
}
