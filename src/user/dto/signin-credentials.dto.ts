import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
