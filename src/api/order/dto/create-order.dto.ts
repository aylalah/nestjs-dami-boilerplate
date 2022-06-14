import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsName } from '../../../utils/validation.util';

export class CreateOrderDto {
        
  @IsString()
  @Length(1, 56)
  @ApiProperty()
  product_id: string;

  @IsString()
  @Length(1, 56)
  @ApiProperty()
  plan: string;

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
  @Length(1, 200)
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
