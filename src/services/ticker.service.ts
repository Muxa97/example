import { Op } from 'sequelize'
import models from '../models'
import { TickerInstance } from '../models/ticker'
import { TickerAttributes, TickerCreationAttributes } from '../types/ticker'

const { Ticker } = models

async function create (attrs: TickerAttributes): Promise<TickerInstance> {
  return Ticker.create(attrs)
}

async function createMany (tickers: TickerCreationAttributes[]): Promise<TickerInstance[]> {
  return Ticker.bulkCreate(tickers)
}

async function findByTickers (tickers: string[]): Promise<TickerInstance[]> {
  return Ticker.findAll({
    where: {
      ticker: {
        [Op.in]: tickers,
      },
    },
  })
}

async function remove (ticker: string): Promise<any> {
  return Ticker.destroy({
    where: {
      ticker,
    },
  })
}

export {
  create,
  createMany,
  findByTickers,
  remove,
}
