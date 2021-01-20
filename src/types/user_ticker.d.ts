
export interface UserTickerAttributes {
    id: number,
    userHash: string,
    tickerId: number,
    address: string
}

export type UserTickerAttributesCreation = Exclude<UserTickerAttributes, 'id'>
