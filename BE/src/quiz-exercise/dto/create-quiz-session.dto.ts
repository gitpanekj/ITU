import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateQuizSessionDto {
    @IsOptional()
    @IsInt()
    id?: number

    @IsNotEmpty()
    @IsInt()
    exerciseId: number

    @IsOptional()
    @IsInt()
    questionIdx?: number

    @IsNotEmpty()
    @IsInt()
    total: number

    @IsOptional()
    @IsString()
    correct?: string; // {id, name}

    @IsOptional()
    @IsString()
    wrong?: string;   // {id, name, chosen}
}