import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
import { TransactionPayload } from '@/modules/transactions/domain/types/transactions-payload.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class CreateTransactionsUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}

  public async execute(ctx: Context, transactions: TransactionPayload[]) {
    const request = await this.httpService.post(
      `/v1/transactions`,
      {
        transactions,
      },
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
