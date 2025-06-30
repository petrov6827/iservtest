export interface ChargeDetail {
  ChargeDetailId: number;
  GroupName: string;
  Name: string;
  Quantity: number;
  Tariff: number;
  UnitName: string;
  Total: number;
  Amount: number;
  Recalc: number;
  ImpSaldoInfo: string;
}

export interface Charge {
  ChargeId: number;
  SubscrId: number;
  Period: number;
  PeriodName: string;
  DebtByBeginMonth: number;
  Amount: number;
  Payment: number;
  AmountToPay: number;
  ChargeDetails: ChargeDetail[];
}

export interface Subscr {
  SubscrId: number;
  OrgId: number;
  SubscrCode: string;
  FIO: string;
  Address: string;
  charges: Charge[];
}