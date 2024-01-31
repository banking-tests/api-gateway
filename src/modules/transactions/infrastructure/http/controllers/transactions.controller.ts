import { Context } from '@/core/application/interfaces/context.interface';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';
import { QueryParser } from '@/core/infrastructure/decorators/query-parser.decorator';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { CreateTransactionsUseCase } from '@/modules/transactions/application/use-cases/create-transactions.use-case';
import { ListTransactionsUseCase } from '@/modules/transactions/application/use-cases/list-transactions.use-case';
import { CreateTransactionsDto } from '@/modules/transactions/infrastructure/http/dtos/create-transactions.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller({ path: '/', version: '1' })
export class TransactionsController {
  constructor(
    private readonly listTransactionsUseCase: ListTransactionsUseCase,
    private readonly createTransactionsUseCase: CreateTransactionsUseCase,
  ) {}

  @Get('/')
  public listTransactions(
    @Ctx() context: Context,
    @QueryParser('search') search: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return this.listTransactionsUseCase.execute(context, search, filter, options);
  }

  @Post('/')
  public createTransactions(@Ctx() context: Context, @Body() body: CreateTransactionsDto) {
    return this.createTransactionsUseCase.execute(context, body.transactions);
  }
}
