export interface UserAddressAttributes {
    id: number,
    userId: number,
    addressId: number
}

export type UserAddressCreationAttributes = Exclude<UserAddressAttributes, 'id'>
