import { IsInt, IsNotEmpty, IsOptional, IsSemVer, IsString } from "class-validator";

export class CreateTextDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsString()
    content: string
}