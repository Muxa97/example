import { FastifyReply, FastifyRequest } from 'fastify'
import * as TickerService from '../services/ticker.service'
import * as UserService from '../services/user.service'
import * as AddressService from '../services/address.service'
import { UserCreationAttributes } from '../types/user'
import { AddressCreationAttributes } from '../types/address'
import { UserInstance } from '../models/user'
import { AddressInstance } from '../models/address'
import { TickerInstance } from '../models/ticker'

async function create (req: FastifyRequest, reply: FastifyReply) {
  const { coins, ...user } = req.body as UserCreationAttributes & { coins: Array<{ address: string, ticker: string }> }

  try {
    const createdUser: UserInstance = await UserService.findOrCreate(user)
    const tickers = await TickerService.findByTickers(
      coins.map((coin: { address: string, ticker: string }) => coin.ticker),
    )

    const addresses: AddressCreationAttributes[] = coins.map((coin: { address: string, ticker: string }) => {
      const coinTicker = tickers.find((ticker) => ticker.ticker === coin.ticker)
      const isCreated = !createdUser.isNewRecord &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          !!createdUser.getDataValue('Addresses').find((addr: AddressInstance) => addr.address === coin.address)

      if (!coinTicker || isCreated) {
        return null
      }

      return {
        userId: createdUser.id,
        tickerId: coinTicker.id,
        address: coin.address,
      }
    }).filter(Boolean)

    const createdAddresses = await AddressService.createMany(addresses)

    reply.send({
      user,
      createdAddresses,
    })
  } catch (error) {
    reply.send(error)
  }
}

async function findAddresses (req: FastifyRequest, reply: FastifyReply) {
  const userFields = req.query as UserCreationAttributes

  try {
    const user = await UserService.findOne(userFields)

    if (!user) {
      throw new Error(`User with hash ${userFields.hash} and app version ${userFields.platform} ${userFields.appVersion} not found`)
    }

    reply.send({
      user,
    })
  } catch (error) {
    reply.send(error)
  }
}

async function findCoins (req: FastifyRequest, reply: FastifyReply) {
  const userFields = req.query as UserCreationAttributes

  try {
    const user = await UserService.findOne(userFields)

    if (!user) {
      throw new Error(`User with hash ${userFields.hash} and app version ${userFields.platform} ${userFields.appVersion} not found`)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const tickerIds = user.Addresses.map((addr: AddressInstance) => addr.tickerId)
    const tickers = await TickerService.findByIds(tickerIds)

    reply.send({
      coins: tickers.map((ticker: TickerInstance) => ticker.ticker),
    })
  } catch (error) {
    reply.send(error)
  }
}

async function remove (req: FastifyRequest, reply: FastifyReply) {
  reply.send(null)
}

export {
  create,
  findAddresses,
  findCoins,
  remove,
}
