import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account-use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account-use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { ListAccountsUseCase } from '@/modules/accounts/application/use-cases/list-accounts.use-case';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account-use-case';
import { UpdateAccountBalanceUseCase } from '@/modules/accounts/application/use-cases/update-account-balance.use-case';

export const useCases = [
  ListAccountsUseCase,
  GetAccountUseCase,
  UpdateAccountBalanceUseCase,
  LockAccountUseCase,
  ActivateAccountUseCase,
  CloseAccountUseCase,
];
