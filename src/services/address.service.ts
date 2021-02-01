import { AddressCreationAttributes } from '../types/address'
import models from '../models'
import { AddressInstance } from '../models/address'

const { Address } = models

async function createMany (addresses: AddressCreationAttributes[]): Promise<AddressInstance[]> {
  return Address.bulkCreate(addresses)
}

export {
  createMany,
}
