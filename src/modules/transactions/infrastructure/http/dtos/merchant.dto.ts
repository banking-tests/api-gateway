import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';

export class MerchantDto {
  @ApiProperty()
  @IsUrl()
  public readonly logo: string;

  @ApiProperty()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty()
  @IsUrl()
  public readonly website: string;
}
