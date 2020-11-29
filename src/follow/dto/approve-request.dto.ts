import { IsNotEmpty, IsInt, IsBoolean, IsOptional } from 'class-validator';

export class ApproveRequestDto {
  @IsOptional()
  @IsInt()
  askFrom: number;

  @IsOptional()
  @IsInt()
  askTo: number;

  @IsNotEmpty()
  @IsBoolean()
  approved: boolean;
}
