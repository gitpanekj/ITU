import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateQuestionAnswerDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    answer: string

    @IsOptional() 
    @IsInt()
    numberOfAnswers?: number

    @IsNotEmpty()
    @IsInt()
    questionId: number
}