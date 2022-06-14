import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateProductDto {

    @IsString()
    @IsName()
    @Length(1, 100)
    @ApiProperty()
    product_name: string;

    @IsString()
    @Length(1, 100)
    @ApiProperty()
    product_type: string;

    @IsOptional()
    @IsString()
    @Length(1, 200)
    @ApiProperty()
    description: string;

    @IsOptional()
    @Length(1, 20)
    @ApiProperty()
    status: number;

    @IsOptional()
    @ApiProperty()
    image: string;
}
