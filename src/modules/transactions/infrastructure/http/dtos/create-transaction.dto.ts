import { Currency } from '@/modules/transactions/domain/enums/currency.enum';
import { TransactionStatus } from '@/modules/transactions/domain/enums/status.enum';
import { TransactionType } from '@/modules/transactions/domain/enums/type.enum';
import { MerchantDto } from '@/modules/transactions/infrastructure/http/dtos/merchant.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly id: string;

  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  public readonly account: string[];

  @ApiProperty()
  @IsDateString()
  public readonly accounting_date: Date;

  @ApiProperty()
  @IsPositive()
  public readonly amount: number;

  @ApiProperty()
  @IsNumber()
  public readonly balance: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly category: string;

  @ApiProperty()
  @IsDateString()
  public readonly collected_at: Date;

  @ApiProperty()
  @IsString()
  @IsEnum(Currency)
  public readonly currency: Currency;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly description: string;

  @ApiProperty()
  @IsString()
  public readonly internal_identification: string;

  @ApiProperty()
  @IsObject()
  @Type(() => MerchantDto)
  @ValidateNested({ each: true })
  public readonly merchant: MerchantDto;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly observations?: string;

  @ApiProperty()
  @IsString()
  @Length(4, 4)
  public readonly reference: string;

  @ApiProperty()
  @IsEnum(TransactionStatus)
  public readonly status: TransactionStatus;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly subcategory?: string;

  @ApiProperty()
  @IsEnum(TransactionType)
  public readonly type: TransactionType;

  @ApiProperty()
  @IsDateString()
  public readonly value_date: Date;

  @ApiProperty()
  @IsDateString()
  public readonly created_at: Date;
}
