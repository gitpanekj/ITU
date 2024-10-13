import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateFlashcardExerciseDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()    
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsInt()
    groupId: number
}
