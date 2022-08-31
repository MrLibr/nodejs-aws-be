import { Currency } from './currency.interface';

export interface ITea {
  id: string;
  title: string;
  description: string;
  img: string;
  currency: Currency;
  price: number;
  count: number;
}
