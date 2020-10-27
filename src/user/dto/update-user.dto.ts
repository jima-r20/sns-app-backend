import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  displayName: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  about: string;
}
