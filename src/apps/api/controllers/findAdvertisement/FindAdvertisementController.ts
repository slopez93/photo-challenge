import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Controller, Get, Param, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { AdvertisementDto } from "src/modules/advertisement/application/dtos/AdvertisementDto";
import { FindAdvertisementQuery } from "src/modules/advertisement/application/query/FindAdvertisementQuery";
import { Advertisement } from "src/modules/advertisement/domain/entities/Advertisement";

type Params = {
  id: string;
  productId: string;
};

@Controller()
export class FindAdvertisementController {
  constructor(
    private queryBus: QueryBus,
    @InjectMapper() private mapper: Mapper
  ) {}

  @Get(":productId/advertisements/:id")
  async getAccount(@Param() params: Params) {
    const { id, productId } = params;

    const advertisement = await this.queryBus.execute(
      new FindAdvertisementQuery(productId, id)
    );

    return this.mapper.map(advertisement, Advertisement, AdvertisementDto);
  }
}
