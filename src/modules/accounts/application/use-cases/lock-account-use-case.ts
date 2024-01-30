import { UseCase } from '@/core/application/case.decorator';
import { Executable } from '@/core/domain/executable.interface';
import { Context } from '@/core/domain/interfaces/context.interface';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@UseCase()
export class LockAccountUseCase implements Executable {
  constructor(private readonly httpService: HttpService) {}
  public async execute(context: Context, uuid: string): Promise<unknown> {
    const request = await this.httpService.patch(`/v1/accounts/${uuid}/lock`, {
      params: {
        requestId: context.requestId,
      },
    });

    const response = await firstValueFrom(request);

    return response.data;
  }
}
