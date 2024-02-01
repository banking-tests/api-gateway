import { Ctx } from '@/core/infrastructure/decorators/context.decorator';
import { QueryParser } from '@/core/infrastructure/decorators/query-parser.decorator';
import { Context } from '@/core/interfaces/context.interface';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { GetProfitabilityUseCase } from '@/modules/finance/application/use-cases/get-profitability.use-case';
import { GroupTransactionsByCategoryUseCase } from '@/modules/finance/application/use-cases/group-transactions-by-category.use-case';
import { GroupTransactionsByMonthsUseCase } from '@/modules/finance/application/use-cases/group-transactions-by-months.use-case';
import { Controller, Get, ParseUUIDPipe, Query } from '@nestjs/common';

@Controller({
  version: '1',
  path: '/',
})
export class FinanceController {
  constructor(
    private readonly getProfitabilityUseCase: GetProfitabilityUseCase,
    private readonly groupTransactionsByMonthsUseCase: GroupTransactionsByMonthsUseCase,
    private readonly groupTransactionsByCategoryUseCase: GroupTransactionsByCategoryUseCase,
  ) {}

  @Get('/profitability')
  public async getFinanceBalance(
    @Ctx() context: Context,
    @Query('account', ParseUUIDPipe) uuid: string,
    @Query() q: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.getProfitabilityUseCase.execute(context, uuid, q, options);
  }

  @Get('/groups/categories')
  public async groupTransactionsByCategory(
    @Ctx() context: Context,
    @Query('account', ParseUUIDPipe) uuid: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.groupTransactionsByCategoryUseCase.execute(context, uuid, filter, options);
  }

  @Get('/groups/months')
  public async groupTransactionsByMonths(
    @Ctx() context: Context,
    @Query('account', ParseUUIDPipe) uuid: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.groupTransactionsByMonthsUseCase.execute(context, uuid, filter, options);
  }
}
