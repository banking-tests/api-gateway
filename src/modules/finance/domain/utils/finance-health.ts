import { Transaction } from '@/modules/transactions/domain/interfaces/transaction.interface';

export function financeBalance(transactions: Transaction[]) {
  const { inflow, outflow } = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'INFLOW') {
        acc.inflow += transaction.amount;
      } else {
        acc.outflow += transaction.amount;
      }
      return acc;
    },
    { inflow: 0, outflow: 0 },
  );

  let profitability = 0;

  if (inflow !== 0) {
    profitability = ((inflow - outflow) / inflow) * 100;
  }

  return {
    inflow,
    outflow,
    balance: inflow - outflow,
    profitability,
  };
}
