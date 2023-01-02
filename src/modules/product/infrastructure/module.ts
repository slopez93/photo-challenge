import { Logger, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateAdvertisementController } from "src/apps/api/controllers/createAdvertisement/CreateAdvertisementController";
import { CreateProductController } from "src/apps/api/controllers/createProduct/CreateProductController";
import { DeleteAdvertisementsController } from "src/apps/api/controllers/deleteAdvertisement/DeleteAdvertisementController";
import { FindAdvertisementController } from "src/apps/api/controllers/findAdvertisement/FindAdvertisementController";
import { FindAdvertisementsController } from "src/apps/api/controllers/findAdvertisements/FindAdvertisementsController";
import { FindProductsController } from "src/apps/api/controllers/findProducts/FindProductsController";
import { UpdateAdvertisementController } from "src/apps/api/controllers/updateAdvertisement/UpdateAdvertisementController";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { CreateProductCommandHandler } from "../application/commandHandlers/CreateProductCommandHandler";
import { ProductProfile } from "../application/mappers/ProductProfile";
import { FindProductQueryHandler } from "../application/queryHandlers/FindProductQueryHandler";
import { FindProductsQueryHandler } from "../application/queryHandlers/FindProductsQueryHandler";
import { PRODUCT_REPOSITORY } from "../domain/repositories/ProductRepository";
import { DynamoDbAccountRepository } from "./persistence/DynamoDbProductRespository";

const ProductCommandHandlers = [CreateProductCommandHandler];
const ProductQueryHandlers = [
  FindProductQueryHandler,
  FindProductsQueryHandler,
];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    ProductProfile,
    DynamoDbClient,
    { useClass: DynamoDbAccountRepository, provide: PRODUCT_REPOSITORY },
    ...ProductCommandHandlers,
    ...ProductQueryHandlers,
  ],
  controllers: [
    CreateProductController,
    CreateAdvertisementController,
    FindProductsController,
    FindAdvertisementController,
    FindAdvertisementsController,
    UpdateAdvertisementController,
    DeleteAdvertisementsController,
  ],
})
export class ProductModule {}
