import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { AdvertisimentNotFound } from "../../domain/exceptions/AdvertisementNotFound";
import {
  AdvertisementRepository,
  ADVERTISEMENT_REPOSITORY,
} from "../../domain/repositories/AdvertisementRepository";
import { UpdateAdvertisementCommand } from "../command/UpdateAdvertisementCommand";
import { FindAdvertisementQuery } from "../query/FindAdvertisementQuery";

@CommandHandler(UpdateAdvertisementCommand)
export class UpdateAdvertisementCommandHandler
  implements ICommandHandler<UpdateAdvertisementCommand>
{
  constructor(
    @Inject(ADVERTISEMENT_REPOSITORY)
    private repository: AdvertisementRepository,
    private queryBus: QueryBus
  ) {}

  async execute({
    productId,
    advertisementId,
    title,
    validUntil,
    discountPercentage,
  }: UpdateAdvertisementCommand): Promise<void> {
    const advertisement = await this.queryBus.execute(
      new FindAdvertisementQuery(productId, advertisementId)
    );

    if (title) {
      advertisement.setTitle(title);
    }

    if (validUntil) {
      advertisement.setValidUntil(new Date(validUntil));
    }

    if (discountPercentage) {
      advertisement.setDiscountPercentage(discountPercentage);
    }

    await this.repository.save(advertisement);
  }
}
