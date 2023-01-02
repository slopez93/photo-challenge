import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { CreateAdvertisementCommandHandler } from "../application/commandHandlers/CreateAdvertisementCommandHandler";
import { DeleteAdvertisementCommandHandler } from "../application/commandHandlers/DeleteAdvertisementCommandHandler";
import { UpdateAdvertisementCommandHandler } from "../application/commandHandlers/UpdateAdvertisementCommandHandler";
import { AdvertisementProfile } from "../application/mappers/AdvertisementProfile";
import { FindAdvertisementQueryHandler } from "../application/queryHandlers/FindAdvertisementQueryHandler";
import { FindAdvertisementsQueryHandler } from "../application/queryHandlers/FindAdvertisementsQueryHandler";
import { ADVERTISEMENT_REPOSITORY } from "../domain/repositories/AdvertisementRepository";
import { DynamoDbAdvertisementRepository } from "./persistence/DynamoDbAdvertisementRespository";

const AdvertisementQueryHandlers = [
  FindAdvertisementsQueryHandler,
  FindAdvertisementQueryHandler,
];

const AdvertisementCommandHandlers = [
  CreateAdvertisementCommandHandler,
  UpdateAdvertisementCommandHandler,
  DeleteAdvertisementCommandHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    AdvertisementProfile,
    DynamoDbClient,
    {
      useClass: DynamoDbAdvertisementRepository,
      provide: ADVERTISEMENT_REPOSITORY,
    },
    ...AdvertisementQueryHandlers,
    ...AdvertisementCommandHandlers,
  ],
})
export class AdvertisementModule {}
