import { Context } from '@/core/interfaces/context.interface';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';
import { QueryParser } from '@/core/infrastructure/decorators/query-parser.decorator';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account-use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account-use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { ListAccountsUseCase } from '@/modules/accounts/application/use-cases/list-accounts.use-case';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account-use-case';
import { UpdateAccountBalanceUseCase } from '@/modules/accounts/application/use-cases/update-account-balance.use-case';
import { UpdateBalanceDto } from '@/modules/accounts/infrastructure/http/dtos/update-balance.dto';
import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { GroupTransactionsByMonthsUseCase } from '@/modules/accounts/application/use-cases/group-transactions-by-months.use-case';
import { ListAccountTransactionsUseCase } from '@/modules/accounts/application/use-cases/list-transactions-by-account';
import { GroupTransactionsByCategoryUseCase } from '@/modules/accounts/application/use-cases/group-transactions-by-category.use-case';

@Controller({ path: '/', version: '1' })
export class AccountsController {
  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
    private readonly lockAccountUseCase: LockAccountUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly closeAccountUseCase: CloseAccountUseCase,
    private readonly listAccountTransactionsUseCase: ListAccountTransactionsUseCase,
    private readonly groupTransactionsByCategoryUseCase: GroupTransactionsByCategoryUseCase,
    private readonly groupTransactionsByMonthsUseCase: GroupTransactionsByMonthsUseCase,
  ) {}

  @Get('/')
  public async listAccounts(
    @Ctx() context: Context,
    @QueryParser('search') search: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.listAccountsUseCase.execute(context, search, filter, options);
  }

  @Get('/:uuid')
  public getAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    return this.getAccountUseCase.execute(context, uuid);
  }

  @Patch('/:uuid/balance')
  public async updateAccountBalance(
    @Ctx() context: Context,
    @Param('uuid') uuid: string,
    @Body() body: UpdateBalanceDto,
  ) {
    return await this.updateAccountBalanceUseCase.execute(context, uuid, body.balance);
  }

  @Patch('/:uuid/lock')
  public lockAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    return this.lockAccountUseCase.execute(context, uuid);
  }

  @Patch('/:uuid/activate')
  public activateAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    return this.activateAccountUseCase.execute(context, uuid);
  }

  @Patch('/:uuid/close')
  public closeAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    return this.closeAccountUseCase.execute(context, uuid);
  }

  @Get('/:uuid/transactions')
  public listTransactionsByAccount(
    @Ctx() context: Context,
    @Param('uuid') uuid: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.listAccountTransactionsUseCase.execute(context, uuid, filter, options);
  }

  @Get('/:uuid/transactions/groups/categories')
  public listGroupedTransactionsByCategory(
    @Ctx() context: Context,
    @Param('uuid') uuid: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.groupTransactionsByCategoryUseCase.execute(context, uuid, filter, options);
  }

  @Get('/:uuid/transactions/groups/months')
  public listGroupedTransactionsByMonths(
    @Ctx() context: Context,
    @Param('uuid') uuid: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.groupTransactionsByMonthsUseCase.execute(context, uuid, filter, options);
  }
}
