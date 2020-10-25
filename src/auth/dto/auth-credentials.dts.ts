import { IsString, IsEmail } from 'class-validator';
import { Matches, MinLength, MaxLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;

  @IsString()
  @MinLength(1)
  @MaxLength(20)
  displayName: string;

  @IsString()
  avatar: string;

  @IsString()
  @MaxLength(256)
  about: string;
}
