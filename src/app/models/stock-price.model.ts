import { Time } from '@angular/common';

export class StockPrice {
    id?: number;
    stockExchange: string;
    companyStockCode: string;
    currentPrice: number;
    date?: Date;
    time?: Time;
}
