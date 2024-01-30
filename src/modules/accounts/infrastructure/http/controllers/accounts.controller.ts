import { Context } from '@/core/domain/interfaces/context.interface';
import { Ctx } from '@/core/infrastructure/decorators/context.decorator';
import { QueryParser } from '@/core/infrastructure/decorators/query-parser.decorator';
import { Json } from '@/core/types/general/json.type';
import { QueryParsedOptions } from '@/core/types/general/query-parsed-options.type';
import { ActivateAccountUseCase } from '@/modules/accounts/application/use-cases/activate-account-use-case';
import { CloseAccountUseCase } from '@/modules/accounts/application/use-cases/close-account-use-case';
import { GetAccountUseCase } from '@/modules/accounts/application/use-cases/get-account.use-case';
import { ListAccountsUseCase } from '@/modules/accounts/application/use-cases/list-accounts.use-case';
import { LockAccountUseCase } from '@/modules/accounts/application/use-cases/lock-account-use-case';
import { UpdateAccountBalanceUseCase } from '@/modules/accounts/application/use-cases/update-account-balance.use-case';
import { UpdateBalanceDto } from '@/modules/accounts/infrastructure/http/dtos/update-balance.dto';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Patch,
} from '@nestjs/common';

@Controller({ path: '/', version: '1' })
export class AccountsController {
  constructor(
    private readonly listAccountsUseCase: ListAccountsUseCase,
    private readonly getAccountUseCase: GetAccountUseCase,
    private readonly updateAccountBalanceUseCase: UpdateAccountBalanceUseCase,
    private readonly lockAccountUseCase: LockAccountUseCase,
    private readonly activateAccountUseCase: ActivateAccountUseCase,
    private readonly closeAccountUseCase: CloseAccountUseCase,
  ) {}

  @Get('/')
  public async listAccounts(
    @Ctx() context: Context,
    @QueryParser('search') search: string,
    @QueryParser('filter') filter: Json,
    @QueryParser('options') options: QueryParsedOptions,
  ) {
    return await this.listAccountsUseCase.execute(context, search, filter, options);
  }

  @Get('/:uuid')
  public async getAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    try {
      return await this.getAccountUseCase.execute(context, uuid);
    } catch (error) {
      switch (error?.response?.status || 500) {
        case 404: {
          throw new NotFoundException(error.response.data.message);
        }
        default: {
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    }
  }

  @Patch('/:uuid/balance')
  public async updateAccountBalance(
    @Ctx() context: Context,
    @Param('uuid') uuid: string,
    @Body() body: UpdateBalanceDto,
  ) {
    try {
      return await this.updateAccountBalanceUseCase.execute(context, uuid, body.balance);
    } catch (error) {
      switch (error?.response?.status || 500) {
        case 400: {
          throw new BadRequestException(error.response.data.message);
        }
        case 404: {
          throw new NotFoundException(error.response.data.message);
        }
        default: {
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    }
  }

  @Patch('/:uuid/lock')
  public async lockAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    try {
      return await this.lockAccountUseCase.execute(context, uuid);
    } catch (error) {
      switch (error?.response?.status || 500) {
        case 400: {
          throw new BadRequestException(error.response.data.message);
        }
        case 404: {
          throw new NotFoundException(error.response.data.message);
        }
        default: {
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    }
  }

  @Patch('/:uuid/activate')
  public async activateAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    try {
      return await this.activateAccountUseCase.execute(context, uuid);
    } catch (error) {
      switch (error?.response?.status || 500) {
        case 400: {
          throw new BadRequestException(error.response.data.message);
        }
        case 404: {
          throw new NotFoundException(error.response.data.message);
        }
        default: {
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    }
  }

  @Patch('/:uuid/close')
  public async closeAccount(@Ctx() context: Context, @Param('uuid') uuid: string) {
    try {
      return await this.closeAccountUseCase.execute(context, uuid);
    } catch (error) {
      console.log(error);
      switch (error?.response?.status || 500) {
        case 400: {
          throw new BadRequestException(error.response.data.message);
        }
        case 404: {
          throw new NotFoundException(error.response.data.message);
        }
        case 409: {
          throw new BadRequestException(error.response.data.message);
        }
        default: {
          throw new InternalServerErrorException(error.response.data.message);
        }
      }
    }
  }
}
