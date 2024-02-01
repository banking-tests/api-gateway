import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account-use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account-use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { ListAccountsUseCase } from '@/modules/accounts/application/use-cases/list-accounts.use-case';
import { GroupTransactionsByCategoryUseCase } from '@/modules/accounts/application/use-cases/group-transactions-by-category.use-case';
import { GroupTransactionsByMonthsUseCase } from '@/modules/accounts/application/use-cases/group-transactions-by-months.use-case';
import { ListAccountTransactionsUseCase } from '@/modules/accounts/application/use-cases/list-transactions-by-account';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account-use-case';
import { UpdateAccountBalanceUseCase } from '@/modules/accounts/application/use-cases/update-account-balance.use-case';

export const useCases = [
  ActivateAccountUseCase,
  CloseAccountUseCase,
  GetAccountUseCase,
  GroupTransactionsByCategoryUseCase,
  GroupTransactionsByMonthsUseCase,
  ListAccountsUseCase,
  ListAccountTransactionsUseCase,
  LockAccountUseCase,
  UpdateAccountBalanceUseCase,
  ListAccountTransactionsUseCase,
  GroupTransactionsByCategoryUseCase,
];
