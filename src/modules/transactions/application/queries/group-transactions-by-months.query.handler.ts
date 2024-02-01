import { GroupTransactionsByMonthsQuery } from '@/modules/transactions/domain/queries/group-transactions-by-months.query';
import { HttpService } from '@nestjs/axios';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GroupTransactionsByMonthsQuery)
export class GroupTransactionsByMonthsQueryHandler
  implements IQueryHandler<GroupTransactionsByMonthsQuery>
{
  constructor(private readonly httpService: HttpService) {}

  public async execute(query: GroupTransactionsByMonthsQuery) {
    const request = await this.httpService.get(`/v1/transactions/groups/months`, {
      params: {
        requestId: query.context.requestId,
        sort: '-value_date',
        ...query.options,
        account: query.accountId,
      },
    });

    const response = await firstValueFrom(request);

    return response.data;
  }
}
