import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Advertisement } from "../../domain/entities/Advertisement";
import { AdvertisimentNotFound } from "../../domain/exceptions/AdvertisementNotFound";
import {
  AdvertisementRepository,
  ADVERTISEMENT_REPOSITORY,
} from "../../domain/repositories/AdvertisementRepository";
import { FindAdvertisementQuery } from "../query/FindAdvertisementQuery";

@QueryHandler(FindAdvertisementQuery)
export class FindAdvertisementQueryHandler
  implements IQueryHandler<FindAdvertisementQuery>
{
  constructor(
    @Inject(ADVERTISEMENT_REPOSITORY)
    private repository: AdvertisementRepository
  ) {}

  public async execute({
    productId,
    adversitmentId,
  }: FindAdvertisementQuery): Promise<Advertisement> {
    const advertisement = await this.repository.find(productId, adversitmentId);

    if (!advertisement) {
      throw new AdvertisimentNotFound(adversitmentId);
    }

    return advertisement;
  }
}
