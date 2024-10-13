import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateExerciseGroupDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsInt()
    teacherId: number
}
