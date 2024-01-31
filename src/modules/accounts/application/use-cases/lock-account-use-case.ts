import { UseCase } from '@/core/application/case.decorator';
import { Context } from '@/core/application/interfaces/context.interface';
import { Executable } from '@/core/domain/executable.interface';
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
