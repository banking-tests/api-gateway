import { UseCase } from '@/core/application/case.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/interfaces/context.interface';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { GroupTransactionsByMonthsQuery } from '@/modules/transactions/domain/queries/group-transactions-by-months.query';
import { QueryBus } from '@nestjs/cqrs';

@UseCase()
export class GroupTransactionsByMonthsUseCase implements Executable {
  constructor(private readonly queryBus: QueryBus) {}

  public execute(ctx: Context, account: string, filter: Json, options: QueryParsedOptions) {
    return this.queryBus.execute(
      new GroupTransactionsByMonthsQuery(ctx, account, filter, options),
    );
  }
}
