import { Context } from '@/core/interfaces/context.interface';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';

export class GetTransactionsByAccountQuery {
  constructor(
    public readonly context: Context,
    public readonly accountId: string,
    public readonly options: QueryParsedOptions,
  ) {}
}
