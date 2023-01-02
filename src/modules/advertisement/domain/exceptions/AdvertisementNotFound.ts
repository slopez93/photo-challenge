import { HttpException, HttpStatus } from "@nestjs/common";

export class AdvertisimentNotFound extends HttpException {
  constructor(advertisement: string) {
    super(
      `Advertisement with id ${advertisement} not found`,
      HttpStatus.NOT_FOUND
    );
  }
}
