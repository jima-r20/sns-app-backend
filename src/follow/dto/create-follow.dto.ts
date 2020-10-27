import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

export class CreateFollowDto {
  @IsNotEmpty()
  @IsInt()
  askTo: number;

  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;
}
