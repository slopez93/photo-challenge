import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from "class-validator";

export class UpdateAdvertisementRequest {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  validUntil: string;

  @IsOptional()
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  discountPercentage: number;
}
