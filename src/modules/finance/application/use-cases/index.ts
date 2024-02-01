import { GetProfitabilityUseCase } from '@/modules/finance/application/use-cases/get-profitability.use-case';
import { GroupTransactionsByCategoryUseCase } from '@/modules/finance/application/use-cases/group-transactions-by-category.use-case';
import { GroupTransactionsByMonthsUseCase } from '@/modules/finance/application/use-cases/group-transactions-by-months.use-case';

export const useCases = [
  GetProfitabilityUseCase,
  GroupTransactionsByMonthsUseCase,
  GroupTransactionsByCategoryUseCase,
];
