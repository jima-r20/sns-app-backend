import { IsString } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  displayName: string;

  @IsString()
  avatar: string;

  @IsString()
  about: string;
}
