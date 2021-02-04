import models from '../models'
import { UserCreationAttributes } from '../types/user'
import { UserInstance } from '../models/user'

const { User, Address } = models

async function findOrCreate (attrs: UserCreationAttributes): Promise<UserInstance> {
  const userInstances: UserInstance[] = await User.findAll({
    where: {
      hash: attrs.hash,
    },
    include: [Address],
  })

  if (userInstances.length === 0) {
    return User.create(attrs)
  }

  const user = userInstances.find(
    (instance: UserInstance) => instance.platform === attrs.platform && instance.appVersion === attrs.appVersion,
  )

  if (user) {
    return user
  }

  const createdUser: UserInstance = await User.create(attrs)

  // eslint-disable-next-line no-console
  console.log(`User ${attrs.hash} changed platform version to ${attrs.platform} ${attrs.version}`)
  return createdUser
}

async function findOne ({ hash, platform, appVersion }: UserCreationAttributes): Promise<UserInstance | null> {
  return User.findOne({
    where: {
      hash,
      platform,
      appVersion,
    },
    include: [Address],
  })
}

async function remove (hash: string) {
  return User.destroy({
    where: {
      hash,
    },
  })
}

export {
  findOrCreate,
  findOne,
  remove,
}
