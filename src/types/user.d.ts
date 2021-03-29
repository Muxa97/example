
export interface UserAttributes {
    id: number,
    hash: string,
    platform: string,
    appVersion: string
}

export type UserCreationAttributes = Optional<UserAttributes, 'id'>
