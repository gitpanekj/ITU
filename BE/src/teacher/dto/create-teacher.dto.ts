import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTeacherDto {

    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    username: string
}
