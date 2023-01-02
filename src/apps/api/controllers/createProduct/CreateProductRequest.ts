import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductRequest {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  price: number;
}
