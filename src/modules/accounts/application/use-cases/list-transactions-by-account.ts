import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
import { Json } from '@/core/types/general/json.type';
import { QueryBus } from '@nestjs/cqrs';
import { GetTransactionsByAccountQuery } from '@/modules/transactions/domain/queries/get-transactions-by-account.query';

@UseCase()
export class ListAccountTransactionsUseCase implements Executable {
  constructor(private readonly queryBus: QueryBus) {}

  public async execute(ctx: Context, accountId: string, filter: Json, options: Json) {
    return this.queryBus.execute(
      new GetTransactionsByAccountQuery(ctx, accountId, filter, {
        limit: 100,
        ...options,
        sort: '-value_date',
      }),
    );
  }
}
