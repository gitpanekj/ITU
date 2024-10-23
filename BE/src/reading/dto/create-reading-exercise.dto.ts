import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateReadingExerciseDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsInt()
    groupId: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    description?: string

    @IsNotEmpty()
    @IsInt()
    textId: number

}