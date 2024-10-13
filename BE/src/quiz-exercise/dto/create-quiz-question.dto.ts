import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateQuizQuestionDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    question: string
    
    @IsOptional()
    @IsInt()
    easyCount?: number

    @IsOptional()
    @IsInt()
    hardCount?: number

    @IsNotEmpty()
    @IsInt()
    quizId: number

    @IsOptional()
    @IsInt()
    rightAnswerId?: number

    @IsOptional()
    @IsInt()
    referenceId?: number
}