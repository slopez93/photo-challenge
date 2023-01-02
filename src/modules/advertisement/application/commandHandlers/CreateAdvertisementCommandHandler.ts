import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Advertisement } from "../../domain/entities/Advertisement";
import {
  AdvertisementRepository,
  ADVERTISEMENT_REPOSITORY,
} from "../../domain/repositories/AdvertisementRepository";
import { CreateAdvertisementCommand } from "../command/CreateAdvertisementCommand";

@CommandHandler(CreateAdvertisementCommand)
export class CreateAdvertisementCommandHandler
  implements ICommandHandler<CreateAdvertisementCommand>
{
  constructor(
    @Inject(ADVERTISEMENT_REPOSITORY)
    private repository: AdvertisementRepository
  ) {}

  async execute({
    productId,
    title,
    validUntil,
    discountPercentage,
  }: CreateAdvertisementCommand): Promise<void> {
    const ad = Advertisement.create({
      productId,
      title,
      validUntil,
      discountPercentage,
    });

    await this.repository.save(ad);
  }
}
