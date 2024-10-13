import { Optional } from "@nestjs/common"
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateQuizExerciseDto {
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

    @Optional()
    @IsInt()
    textId?: number
}
