import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/application/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
import { Json } from '@/core/types/general/json.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class ListTransactionsUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}
  public async execute(ctx: Context, search: string, filter: Json, options: Json) {
    const request = await this.httpService.get('/v1/transactions', {
      params: {
        requestId: ctx.requestId,
        search,
        ...filter,
        ...options,
      },
    });

    const response = await firstValueFrom(request);

    return response.data;
  }
}
