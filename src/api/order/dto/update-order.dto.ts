import { PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
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

export class UpdateOrderDto extends PartialType(CreateOrderDto) {

    @IsString()
    @Length(1, 20)
    @ApiProperty()
    product_id: string;
  
    @IsString()
    @Length(1, 16)
    @ApiProperty()
    serial_number: string;
  
    @IsString()
    @Length(1, 52)
    @ApiProperty()
    plan: string;

    @IsString()
    @IsName()
    @Length(1, 10)
    @ApiProperty()
    app_code: string;
  
    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    school_name: string;

    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    address: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 100)
    @ApiProperty()
    about: string;
  
    @IsOptional()
    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    country: string;

    @IsOptional()
    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    state: string;
  
    @IsOptional()
    @IsString()
    @IsName()
    @Length(1, 52)
    @ApiProperty()
    town: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 52)
    @ApiProperty()
    poster_code: string;
  
    @IsEmail()
    @Length(1, 52)
    @ApiProperty()
    email: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 20)
    @ApiProperty()
    mobile: string;
  
    @IsOptional()
    @IsNumberString()
    @Length(1, 15)
    @ApiProperty()
    phone: string;
  
    @Length(1, 200)
    @ApiProperty()
    document: string;
  
    @IsOptional()
    @IsString()
    @Length(1, 52)
    @ApiProperty()
    fax: string;
  
    @IsString()
    @Length(1, 60)
    @ApiProperty()
    website: string;
  
    @Length(1, 11)
    @ApiProperty()
    app_url: string;
  
    @IsOptional()
    @IsName()
    @IsString()
    @Length(1, 56)
    @ApiPropertyOptional()
    contact_person?: string;
    
  
    @IsString()
    @Length(1, 255)
    @ApiPropertyOptional()
    status?: string;
}

