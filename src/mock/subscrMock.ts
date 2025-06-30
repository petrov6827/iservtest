export const subscrsMock = [
  {
    SubscrId: 1,
    OrgId: 101,
    SubscrCode: 'ЛС0001',
    FIO: 'Иванов Иван Иванович',
    Address: 'ул. Ленина, д. 1',
    charges: [
      {
        ChargeId: 999,
        SubscrId: 1,
        Period: 202403,
        PeriodName: 'Март 2024',
        DebtByBeginMonth: 200.0,
        Amount: 700.0,
        Payment: 300.0,
        AmountToPay: 400.0,
        ChargeDetails: [
          {
            ChargeDetailId: 1,
            GroupName: 'Газоснабжение',
            Name: 'Природный газ',
            Quantity: 1.5,
            Tariff: 2000.0,
            UnitName: 'м3',
            Total: 100.0,
            Amount: 50.0,
            Recalc: 0,
            ImpSaldoInfo: ''
          }
        ]
      },
      {
        ChargeId: 1001,
        SubscrId: 1,
        Period: 202501,
        PeriodName: 'Январь 2025',
        DebtByBeginMonth: 1200.0,
        Amount: 800.0,
        Payment: 500.0,
        AmountToPay: 1500.0,
        ChargeDetails: [
          {
            ChargeDetailId: 1,
            GroupName: 'Теплоснабжение',
            Name: 'Отопление',
            Quantity: 1.5,
            Tariff: 2000.0,
            UnitName: 'ГКал',
            Total: 3000.0,
            Amount: 800.0,
            Recalc: 0,
            ImpSaldoInfo: ''
          }
        ]
      },
      {
        ChargeId: 1002,
        SubscrId: 1,
        Period: 202502,
        PeriodName: 'Февраль 2025',
        DebtByBeginMonth: 1500.0,
        Amount: 700.0,
        Payment: 600.0,
        AmountToPay: 1600.0,
        ChargeDetails: [
          {
            ChargeDetailId: 2,
            GroupName: 'Водоснабжение',
            Name: 'Горячая вода',
            Quantity: 3.2,
            Tariff: 100.0,
            UnitName: 'м3',
            Total: 320.0,
            Amount: 700.0,
            Recalc: 0,
            ImpSaldoInfo: ''
          }
        ]
      }
    ]
  },
  {
    SubscrId: 2,
    OrgId: 102,
    SubscrCode: 'ЛС0002',
    FIO: 'Петров Петр Петрович',
    Address: 'ул. Гагарина, д. 2',
    charges: [
      {
        ChargeId: 2001,
        SubscrId: 2,
        Period: 202501,
        PeriodName: 'Январь 2025',
        DebtByBeginMonth: 900.0,
        Amount: 600.0,
        Payment: 400.0,
        AmountToPay: 1100.0,
        ChargeDetails: [
          {
            ChargeDetailId: 3,
            GroupName: 'Электроснабжение',
            Name: 'Электроэнергия',
            Quantity: 120,
            Tariff: 5.0,
            UnitName: 'кВт*ч',
            Total: 600.0,
            Amount: 600.0,
            Recalc: 0,
            ImpSaldoInfo: ''
          }
        ]
      }
    ]
  }
];