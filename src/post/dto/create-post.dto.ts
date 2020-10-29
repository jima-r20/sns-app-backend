import { IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(256)
  content: string;
}
