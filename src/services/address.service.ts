import { AddressCreationAttributes } from '../types/address'
import models from '../models'
import { AddressInstance } from '../models/address'
import { UserAddressCreationAttributes } from '../types/user_address'

const { Address, UserAddress } = models

async function createMany (addresses: AddressCreationAttributes[]): Promise<AddressInstance[]> {
  const createdAddresses = await Address.bulkCreate(addresses)

  const promises = createdAddresses.map((addr) => {
    const attrs: UserAddressCreationAttributes = {
      userId: addr.userId,
      addressId: addr.id,
    } as UserAddressCreationAttributes

    return UserAddress.create(attrs)
  })

  await Promise.all(promises)

  return createdAddresses
}

export {
  createMany,
}
