import { IsInt, IsJSON, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateFlashcardDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    frontFace: string

    @IsNotEmpty()
    @IsString()
    backFace: string

    @IsOptional()
    @IsJSON()
    feedbacks?: JSON

    @IsOptional()
    @IsInt()
    hardCount?: number

    @IsNotEmpty()
    @IsInt()
    flashcardExerciseId: number  
}
