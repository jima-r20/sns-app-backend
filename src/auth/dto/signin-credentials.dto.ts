import { IsString, IsEmail } from 'class-validator';

export class SignInCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
