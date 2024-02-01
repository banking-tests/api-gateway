import { Context } from '@/core/interfaces/context.interface';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';

export class GetProfitabilityByAccountQuery {
  constructor(
    public readonly context: Context,
    public readonly accountId: string,
    public readonly filter: Json,
    public readonly options: QueryParsedOptions,
  ) {}
}
