import { UseCase } from '@/core/application/case.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Json } from '@/core/types/general/json.type';
import { QueryBus } from '@nestjs/cqrs';
import { GetTransactionsByAccountQuery } from '@/modules/transactions/domain/queries/get-transactions-by-account.query';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { Context } from '@/core/interfaces/context.interface';

@UseCase()
export class ListAccountTransactionsUseCase implements Executable {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(
    ctx: Context,
    account: string,
    filter: Json,
    options: QueryParsedOptions,
  ) {
    return this.queryBus.execute(
      new GetTransactionsByAccountQuery(ctx, account, filter, {
        limit: 100,
        ...options,
        sort: '-value_date',
      }),
    );
  }
}
