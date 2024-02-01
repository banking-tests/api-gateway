import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class GetAccountUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}
  public async execute(ctx: Context, uuid: string) {
    const request = await this.httpService.get(`/v1/accounts/${uuid}`, {
      params: {
        requestId: ctx.requestId,
      },
    });
    const response = await firstValueFrom(request);
    return response.data;
  }
}
