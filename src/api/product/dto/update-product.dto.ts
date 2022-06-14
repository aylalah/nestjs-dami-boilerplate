import { PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { date } from '../../../utils/time.utils';
import { IsName } from '../../../utils/validation.util';

export class UpdateProductDto extends PartialType(CreateProductDto) {

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    product_name: string;

    @IsString()
    @Length(1, 52)
    @ApiProperty()
    product_type: string;

    @IsOptional()
    @IsString()
    @Length(1, 200)
    @ApiProperty()
    description: string;

    @IsOptional()
    @ApiProperty()
    status: number;

    @IsOptional()
    @ApiProperty()
    image: string;
}

export class StatusDto {

  @IsOptional()
  @ApiProperty()
  status: number;

}