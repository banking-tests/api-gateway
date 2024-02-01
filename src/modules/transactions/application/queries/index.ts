import { GetProfitabilityByAccountQueryHandler } from '@/modules/transactions/application/queries/get-profitability-by-account.query.handler';
import { GetTransactionsByAccountQueryHandler } from '@/modules/transactions/application/queries/get-transactions-by-account.query.handler';
import { GroupTransactionsByCategoryQueryHandler } from '@/modules/transactions/application/queries/group-transactions-by-category.query.handler';
import { GroupTransactionsByMonthsQueryHandler } from '@/modules/transactions/application/queries/group-transactions-by-months.query.handler';

export const queryHandlers = [
  GetTransactionsByAccountQueryHandler,
  GroupTransactionsByCategoryQueryHandler,
  GetProfitabilityByAccountQueryHandler,
  GroupTransactionsByMonthsQueryHandler,
];
