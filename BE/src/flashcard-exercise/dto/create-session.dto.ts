import { IsArray, IsInt, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator"

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
    @IsInt()
    counter?: number

    @IsOptional()
    @IsString()
    markedAsHard?: string

    @IsOptional()
    @IsString()
    historyHard?: string

    @IsOptional()
    @IsJSON()
    feedback?: JSON
}