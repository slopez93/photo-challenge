import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateAdvertisementRequest {
  @IsString()
  title: string;

  @IsString()
  validUntil: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  discountPercentage: number;
}
