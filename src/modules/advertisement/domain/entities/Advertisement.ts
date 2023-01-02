import { AggregateRoot } from "@nestjs/cqrs";
import { isBefore } from "date-fns";
import { ProductId } from "src/modules/product/domain/valueObjects/ProductId";
import { AdvertisementId } from "../valueObjects/AdvertisementId";

type Params = {
  productId: string;
  title: string;
  validUntil: Date;
  discountPercentage: number;
};

export class Advertisement extends AggregateRoot {
  public id: AdvertisementId;
  public productId: ProductId;
  public title: string;
  public validUntil: Date;
  public discountPercentage: number;

  constructor(
    id: AdvertisementId,
    productId: ProductId,
    title: string,
    validUntil: Date,
    discountPercentage: number
  ) {
    super();
    this.id = id;
    this.productId = productId;
    this.title = title;
    this.validUntil = validUntil;
    this.discountPercentage = discountPercentage;
  }

  static create({ productId, title, validUntil, discountPercentage }: Params) {
    const advertisement = new Advertisement(
      AdvertisementId.create(),
      ProductId.create(productId),
      title,
      validUntil,
      discountPercentage
    );

    return advertisement;
  }

  public setTitle(title: string) {
    this.title = title;
  }

  public setValidUntil(validUntil: Date) {
    this.validUntil = validUntil;
  }

  public setDiscountPercentage(discount: number) {
    this.discountPercentage = discount;
  }

  public isOnAllowedDate(): boolean {
    const currentDate = new Date();

    return isBefore(currentDate, this.validUntil);
  }
}
