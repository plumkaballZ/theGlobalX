import { Address } from './address';

export class User {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
  bill_address_id: string;
  c: string;
  payment_sources: [any];
  bill_address: [Address];
  ship_address: [Address];
  lvl : number;
}