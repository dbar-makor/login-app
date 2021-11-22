export interface IPrices {
  readonly BTCUSD: number;
  readonly ETHUSD: number;
  readonly LTCUSD: number;
};

export interface IHistoricPrices {
    readonly price?: number;
    readonly createdAt: string;
}