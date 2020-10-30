import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateDmDto {
  @IsNotEmpty()
  @IsInt()
  receiver: number;

  @IsNotEmpty()
  @IsString()
  message: string;
}
