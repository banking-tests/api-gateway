import { Json } from '@/core/types/general/json.type';
import { GetTransactionsByAccountQuery } from '@/modules/transactions/domain/queries/get-transactions-by-account.query';
import { HttpService } from '@nestjs/axios';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetTransactionsByAccountQuery)
export class GetTransactionsByAccountQueryHandler
  implements IQueryHandler<GetTransactionsByAccountQuery>
{
  constructor(private readonly httpService: HttpService) {}

  public async execute(query: GetTransactionsByAccountQuery): Promise<Json> {
    const request = await this.httpService.get(`/v1/transactions`, {
      params: {
        requestId: query.context.requestId,
        account: query.accountId,
        ...query.options,
      },
    });

    const response = await firstValueFrom(request);

    return response.data;
  }
}
