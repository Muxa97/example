export interface AddressAttributes {
    id: number,
    userId: number,
    tickerId: number,
    address: string
}

export type AddressCreationAttributes = Exclude<AddressAttributes, 'id'>
