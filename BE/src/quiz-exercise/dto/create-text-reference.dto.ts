import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTextReferenceDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsNotEmpty()
  @IsInt()
  referenceId: number;

  @IsNotEmpty()
  @IsInt()
  textId: number;

  @IsNotEmpty()
  @IsInt()
  questionId: number;
}
