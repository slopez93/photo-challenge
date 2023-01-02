import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import {
  AdvertisementRepository,
  ADVERTISEMENT_REPOSITORY,
} from "../../domain/repositories/AdvertisementRepository";
import { DeleteAdvertisementCommand } from "../command/DeleteAdvertisementCommand";
import { FindAdvertisementQuery } from "../query/FindAdvertisementQuery";

@CommandHandler(DeleteAdvertisementCommand)
export class DeleteAdvertisementCommandHandler
  implements ICommandHandler<DeleteAdvertisementCommand>
{
  constructor(
    @Inject(ADVERTISEMENT_REPOSITORY)
    private repository: AdvertisementRepository,
    public queryBus: QueryBus
  ) {}

  async execute({
    productId,
    advertisementId,
  }: DeleteAdvertisementCommand): Promise<void> {
    // Make sure Advertisement exist
    await this.queryBus.execute(
      new FindAdvertisementQuery(productId, advertisementId)
    );

    await this.repository.delete(productId, advertisementId);
  }
}
