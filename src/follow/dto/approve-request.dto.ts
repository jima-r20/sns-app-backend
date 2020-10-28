import { IsNotEmpty, IsInt, IsBoolean } from 'class-validator';

export class ApproveRequestDto {
  @IsNotEmpty()
  @IsInt()
  askFrom: number;

  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;
}
