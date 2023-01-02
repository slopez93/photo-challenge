import { HttpException, HttpStatus } from "@nestjs/common";

export class ProductNotFound extends HttpException {
  constructor(productId: string) {
    super(`Product with id ${productId} not found`, HttpStatus.NOT_FOUND);
  }
}
