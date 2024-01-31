import { CreateTransactionDto } from '@/modules/transactions/infrastructure/http/dtos/create-transaction.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

export class CreateTransactionsDto {
  @ApiProperty()
  @IsArray()
  @Type(() => Array<CreateTransactionDto>)
  @ValidateNested({ each: true })
  public readonly transactions: CreateTransactionDto[];
}
