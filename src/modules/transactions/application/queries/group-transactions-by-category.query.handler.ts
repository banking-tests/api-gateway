import { GroupTransactionsByCategoryQuery } from '@/modules/transactions/domain/queries/group-transactions-by-category.query';
import { HttpService } from '@nestjs/axios';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { firstValueFrom } from 'rxjs';

@QueryHandler(GroupTransactionsByCategoryQuery)
export class GroupTransactionsByCategoryQueryHandler
  implements IQueryHandler<GroupTransactionsByCategoryQuery>
{
  constructor(private readonly httpService: HttpService) {}

  public async execute(query: GroupTransactionsByCategoryQuery) {
    const request = await this.httpService.get(`/v1/transactions/groups/categories`, {
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
