import { FastifyReply, FastifyRequest } from 'fastify'
import * as TickerService from '../services/ticker.service'
import * as UserService from '../services/user.service'
import * as AddressService from '../services/address.service'
import { UserAttributes, UserCreationAttributes } from '../types/user'
import { AddressCreationAttributes } from '../types/address'
import { UserInstance } from '../models/user'

async function create (req: FastifyRequest, reply: FastifyReply) {
  const { coins, ...user } = req.body as UserCreationAttributes & { coins: Array<{ address: string, ticker: string }> }

  try {
    const createdUser: UserInstance = await UserService.findOrCreate(user)
    const tickers = await TickerService.findByTickers(
      coins.map((coin: { address: string, ticker: string }) => coin.ticker),
    )

    console.log(createdUser)
    const addresses: AddressCreationAttributes[] = coins.map((coin: { address: string, ticker: string }) => {
      const coinTicker = tickers.find((ticker) => ticker.ticker === coin.ticker)

      if (!coinTicker) {
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
  const { hash } = req.body as { hash: string }
}

async function findCoins (req: FastifyRequest, reply: FastifyReply) {
  const { hash } = req.body as { hash: string }
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
