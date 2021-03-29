
export type TickerAttributes = {
    id: number,
    ticker: string
}

export type TickerCreationAttributes = Exclude<TickerAttributes, 'id'>
