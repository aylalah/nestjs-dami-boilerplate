import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsIn,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { titleCase } from '../../../utils';
import { IsName } from '../../../utils/validation.util';

export class RegisterUserDto {

  @IsString()
  @Length(1, 52)
  @ApiProperty()
  role_id: string;

  @IsString()
  @Length(1, 52)
  @ApiProperty()
  permisson_id: string;

  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  first_name: string;

  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  last_name: string;

  @IsString()
  @IsName()
  @Length(1, 52)
  @ApiProperty()
  username: string;

  @IsEmail()
  @Length(1, 52)
  @ApiProperty()
  email: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 26)
  // @ApiProperty()
  // password: string;

  @IsOptional()
  @ApiProperty()
  image: string;

  @IsNumberString()
  @Length(1, 11)
  @ApiProperty()
  phone_number: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 10)
  // @ApiPropertyOptional()
  // gender?: string;
  
  @IsOptional()
  @IsString()
  @Length(1, 220)
  @ApiPropertyOptional()
  home_address?: string;

  @IsOptional()
  @IsString()
  @Length(1, 220)
  @ApiPropertyOptional()
  state_of_residence?: string;

  @IsOptional()
  @IsString()
  @Length(1, 220)
  @ApiPropertyOptional()
  lga?: string;

  @IsOptional()
  @IsString()
  @Length(1, 220)
  @ApiPropertyOptional()
  geo_political_zone?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 6)
  // @ApiPropertyOptional()
  // referral_code?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 255)
  // @ApiPropertyOptional()
  // device_id?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 255)
  // @ApiPropertyOptional()
  // gcm_device_token?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 26)
  // @ApiPropertyOptional()
  // device_type?: string;

  // @IsOptional()
  // @IsString()
  // @Length(1, 26)
  // @ApiPropertyOptional()
  // source?: string;
}

// export class RegisterByServiceUserDto {
//   @IsString()
//   @IsName()
//   @Length(1, 52)
//   @ApiProperty()
//   first_name: string;

//   @IsString()
//   @IsName()
//   @Length(1, 52)
//   @ApiProperty()
//   last_name: string;

//   @IsEmail()
//   @Length(1, 52)
//   @ApiProperty()
//   email: string;

//   @IsOptional()
//   @IsNumberString()
//   @Length(11, 11)
//   @ApiPropertyOptional()
//   bvn?: string;
  
//   @IsOptional()
//   @IsString()
//   @Length(1, 26)
//   @ApiPropertyOptional()
//   password?: string;

//   @IsNumberString()
//   @Length(1, 11)
//   @ApiProperty()
//   phone_number: string;

//   @IsOptional()
//   @Transform(({ value }) => titleCase(value))
//   @ApiPropertyOptional()
//   gender?: string;
  
//   @IsOptional()
//   @IsString()
//   @Length(1, 6)
//   @ApiPropertyOptional()
//   referral_code?: string;

//   @IsOptional()
//   @IsString()
//   @Length(1, 255)
//   @ApiPropertyOptional()
//   device_id?: string;

//   @IsOptional()
//   @IsString()
//   @Length(1, 255)
//   @ApiPropertyOptional()
//   gcm_device_token?: string;

//   @IsOptional()
//   @IsString()
//   @Length(1, 26)
//   @ApiPropertyOptional()
//   device_type?: string;

//   @IsOptional()
//   @IsString()
//   @Length(1, 26)
//   @ApiPropertyOptional()
//   source?: string;

//   @IsOptional()
//   @IsString()
//   @Length(1, 36)
//   @ApiPropertyOptional()
//   merchant_id?: string;

// }
