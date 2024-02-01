import { GetTransactionsByAccountQueryHandler } from '@/modules/transactions/application/queries/get-transactions-by-account.query.handler';
import { GroupTransactionsByCategoryQueryHandler } from '@/modules/transactions/application/queries/group-transactions-by-category.query.handler';

export const queryHandlers = [
  GetTransactionsByAccountQueryHandler,
  GroupTransactionsByCategoryQueryHandler,
];
