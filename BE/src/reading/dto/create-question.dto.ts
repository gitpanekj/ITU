import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateQuestionDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    question: string

    @IsNotEmpty()
    @IsString()
    answer: string

    @IsNotEmpty()
    @IsInt()
    exerciseId: number

    @IsOptional()
    @IsInt()
    textIdx?: number
}