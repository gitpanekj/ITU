import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateTextDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    content: string
}