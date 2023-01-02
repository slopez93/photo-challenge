import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Advertisement } from "../../domain/entities/Advertisement";
import {
  AdvertisementRepository,
  ADVERTISEMENT_REPOSITORY,
} from "../../domain/repositories/AdvertisementRepository";
import { FindAdvertisementsQuery } from "../query/FindAdvertisementsQuery";

@QueryHandler(FindAdvertisementsQuery)
export class FindAdvertisementsQueryHandler
  implements IQueryHandler<FindAdvertisementsQuery>
{
  constructor(
    @Inject(ADVERTISEMENT_REPOSITORY) private repository: AdvertisementRepository
  ) {}

  public async execute({
    productId,
  }: FindAdvertisementsQuery): Promise<Advertisement[]> {
    return await this.repository.findAll(productId);
  }
}
