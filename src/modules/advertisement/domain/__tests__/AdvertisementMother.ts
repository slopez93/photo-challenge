import { WordMother } from "test/shared/WordMother";
import { AdvertisementId } from "../valueObjects/AdvertisementId";
import { Advertisement } from "../entities/Advertisement";
import { IntegerMother } from "test/shared/IntegerMother";
import { ProductId } from "src/modules/product/domain/valueObjects/ProductId";

export class AdvertisementMother {
  static create({
    id = AdvertisementId.create(),
    productId = ProductId.create(),
    title = WordMother.random(4),
    validUntil = new Date(),
    discountPercentage = IntegerMother.random(10),
  }: Partial<Advertisement>) {
    return new Advertisement(
      id,
      productId,
      title,
      validUntil,
      discountPercentage
    );
  }
}
