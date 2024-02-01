import { GetProfitabilityByAccountQuery } from '@/modules/transactions/domain/queries/get-profitability-by-account.query';
import { HttpService } from '@nestjs/axios';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GetProfitabilityByAccountQuery)
export class GetProfitabilityByAccountQueryHandler
  implements IQueryHandler<GetProfitabilityByAccountQuery>
{
  constructor(private readonly httpService: HttpService) {}

  public async execute(query: GetProfitabilityByAccountQuery) {
    const request = await this.httpService.get(`/v1/finance/profitability`, {
      params: {
        requestId: query.context.requestId,
        ...query.filter,
        ...query.options,
        account: query.accountId,
      },
    });

    const response = await firstValueFrom(request);

    return response.data;
  }
}
