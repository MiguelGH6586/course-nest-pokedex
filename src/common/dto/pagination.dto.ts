import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @IsNumber()
    @Type(() => Number)
    limit?: number;

    @IsOptional()
    @IsPositive()
    @IsNumber()
    @Type(() => Number)
    offset?: number;
}