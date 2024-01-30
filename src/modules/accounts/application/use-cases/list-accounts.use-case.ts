import { UseCase } from '@/core/application/case.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import { Json } from '@/core/types/general/json.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class ListAccountsUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}
  public async execute(ctx: Context, search: string, filter: Json, options: Json) {
    const request = await this.httpService.get('/v1/accounts', {
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
