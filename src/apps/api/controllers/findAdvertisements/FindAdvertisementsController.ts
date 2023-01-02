import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AdvertisementDto } from "src/modules/advertisement/application/dtos/AdvertisementDto";
import { FindAdvertisementsQuery } from "src/modules/advertisement/application/query/FindAdvertisementsQuery";
import { Advertisement } from "src/modules/advertisement/domain/entities/Advertisement";

type Params = {
  productId: string;
};

@Controller()
export class FindAdvertisementsController {
  constructor(
    private queryBus: QueryBus,
    @InjectMapper() private mapper: Mapper
  ) {}

  @Get(":productId/advertisements")
  async getAccount(@Param() params: Params) {
    const { productId } = params;

    const advertisements = await this.queryBus.execute(
      new FindAdvertisementsQuery(productId)
    );

    return this.mapper.mapArray(
      advertisements,
      Advertisement,
      AdvertisementDto
    );
  }
}
