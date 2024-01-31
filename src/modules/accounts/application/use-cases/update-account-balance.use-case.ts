import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/application/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class UpdateAccountBalanceUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}

  public async execute(ctx: Context, uuid: string, balance: number) {
    const request = await this.httpService.patch(
      `/v1/accounts/${uuid}/balance`,
      { balance },
      {
        params: {
          requestId: ctx.requestId,
        },
      },
    );

    const response = await firstValueFrom(request);

    return response.data;
  }
}
