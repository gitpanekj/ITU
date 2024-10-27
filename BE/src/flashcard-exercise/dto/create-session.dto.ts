import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateFlashcardSessionDto {
    @IsNotEmpty()
    @IsInt()
    exerciseId: number

    @IsOptional()
    @IsInt()
    flashcardId?: number

    @IsNotEmpty()
    @IsInt()
    total: number

    @IsOptional()
    @IsString()
    markedAsHard?: string

    @IsOptional()
    @IsString()
    historyHard?: string
}